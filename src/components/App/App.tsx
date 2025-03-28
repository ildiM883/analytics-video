import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAnalyticsRequest } from '../../store/actions/analyticsActions'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import EventList from '../EventList/EventList'
import styles from './App.module.scss'

const App: FC = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchAnalyticsRequest())
	}, [dispatch])

	return (
		<div className={styles.app}>
			<h1>Video Analytics Player</h1>
			<div className={styles.content}>
				<VideoPlayer />
				<EventList />
			</div>
		</div>
	)
}

export default App
