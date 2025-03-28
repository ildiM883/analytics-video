import { useRef, useEffect, useState, useCallback, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import {
	playVideo,
	pauseVideo,
	seekVideo,
	updateVideoTime,
	setVideoDuration
} from '../../store/actions/videoActions'
import { formatTime } from '../../utils/timeUtils'
import styles from './VideoPlayer.module.scss'

const VideoPlayer: FC = () => {
	const dispatch = useDispatch()
	const videoRef = useRef<HTMLVideoElement>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const { currentTime, isPlaying, videoDuration } = useSelector(
		(state: RootState) => state.video
	)
	const { activeEvents } = useSelector((state: RootState) => state.analytics)
	const [showPlayButton, setShowPlayButton] = useState(false)

	useEffect(() => {
		dispatch(seekVideo(0))
		if (videoRef.current) {
			videoRef.current.currentTime = 0
		}
	}, [dispatch])

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		const handleTimeUpdate = () => dispatch(updateVideoTime(video.currentTime))
		const handleLoadedMetadata = () =>
			dispatch(setVideoDuration(video.duration))

		video.addEventListener('timeupdate', handleTimeUpdate)
		video.addEventListener('loadedmetadata', handleLoadedMetadata)

		return () => {
			video.removeEventListener('timeupdate', handleTimeUpdate)
			video.removeEventListener('loadedmetadata', handleLoadedMetadata)
		}
	}, [dispatch])

	useEffect(() => {
		if (!videoRef.current) return

		if (isPlaying) {
			videoRef.current.play().catch(console.error)
		} else {
			videoRef.current.pause()
		}
	}, [isPlaying])

	useEffect(() => {
		const video = videoRef.current
		if (!video || Math.abs(video.currentTime - currentTime) <= 0.1) return

		video.currentTime = currentTime
		if (isPlaying && video.paused) {
			video.play().catch(console.error)
		}
	}, [currentTime, isPlaying])

	useEffect(() => {
		const canvas = canvasRef.current
		const video = videoRef.current
		if (!canvas || !video) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const drawRectangles = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			activeEvents.forEach(event => {
				const { left, top, width, height } = event.zone
				ctx.strokeStyle = '#00FF00'
				ctx.lineWidth = 2
				ctx.strokeRect(left, top, width, height)
			})
		}

		const resizeCanvas = () => {
			canvas.width = video.clientWidth
			canvas.height = video.clientHeight
			drawRectangles()
		}

		resizeCanvas()
		window.addEventListener('resize', resizeCanvas)
		return () => window.removeEventListener('resize', resizeCanvas)
	}, [activeEvents])

	const handleVideoClick = useCallback(() => {
		dispatch(isPlaying ? pauseVideo() : playVideo())
	}, [dispatch, isPlaying])

	const handleSeek = useCallback(
		(time: number) => {
			dispatch(seekVideo(time))
			if (videoRef.current) {
				videoRef.current.currentTime = time
			}
		},
		[dispatch]
	)

	const handleMouseEnter = useCallback(() => setShowPlayButton(true), [])
	const handleMouseLeave = useCallback(
		() => isPlaying && setShowPlayButton(false),
		[isPlaying]
	)

	return (
		<div className={styles.container}>
			<div
				className={styles.wrapper}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<video
					className={styles.video}
					ref={videoRef}
					src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
					onClick={handleVideoClick}
				/>
				{(!isPlaying || showPlayButton) && (
					<div className={styles.playOverlay}>
						<div className={styles.playIcon}>
							{isPlaying ? 'Pause' : 'Play'}
						</div>
					</div>
				)}
				<canvas ref={canvasRef} className={styles.overlay} />
			</div>
			<div className={styles.controls}>
				<span>{formatTime(currentTime)}</span>
				<input
					className={styles.timeSlider}
					type='range'
					min='0'
					max={videoDuration || 0}
					value={currentTime}
					onChange={e => handleSeek(parseFloat(e.target.value))}
					step='0.01'
				/>
				<span>{formatTime(videoDuration)}</span>
			</div>
		</div>
	)
}

export default VideoPlayer
