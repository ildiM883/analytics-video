import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { playVideo, seekVideo } from '../../store/actions/videoActions'
import { formatTime } from '../../utils/timeUtils'
import styles from './EventList.module.scss'

const EventList: React.FC = () => {
	const dispatch = useDispatch()
	const { events, loading, error } = useSelector(
		(state: RootState) => state.analytics
	)
	const { isPlaying } = useSelector((state: RootState) => state.video)

	const handleEventClick = (timestamp: number) => {
		const wasPlaying = isPlaying
		dispatch(seekVideo(timestamp))

		if (wasPlaying) {
			setTimeout(() => {
				dispatch(playVideo())
			}, 100)
		}
	}

	if (loading)
		return <div className={styles.listContainer}>Loading events...</div>
	if (error) return <div className={styles.listContainer}>Error: {error}</div>

	return (
		<div className={styles.listContainer}>
			<h3 className={styles.title}>Analytics Events</h3>
			<ul className={styles.list}>
				{events.map((event, index) => (
					<li
						key={index}
						className={styles.item}
						onClick={() => handleEventClick(event.timestamp)}
					>
						{formatTime(event.timestamp)}
					</li>
				))}
			</ul>
		</div>
	)
}

export default EventList
