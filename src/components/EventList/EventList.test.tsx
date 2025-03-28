import { render, screen } from '@testing-library/react'
import EventList from './EventList'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import analyticsReducer from '../../store/reducers/analyticsReducer'
import videoReducer from '../../store/reducers/videoReducer'
import { mockAnalyticsEvents } from '../../tests/mocks/mocks'
import { describe, it, expect } from 'vitest'

const mockStore = configureStore({
	reducer: {
		analytics: analyticsReducer,
		video: videoReducer
	},
	preloadedState: {
		analytics: {
			events: mockAnalyticsEvents,
			loading: false,
			error: null,
			activeEvents: []
		},
		video: {
			currentTime: 0,
			isPlaying: false,
			videoDuration: 0
		}
	}
})

describe('EventList', () => {
	it('renders list of events', () => {
		render(
			<Provider store={mockStore}>
				<EventList />
			</Provider>
		)

		expect(screen.getAllByRole('listitem')).toHaveLength(
			mockAnalyticsEvents.length
		)
	})

	it('displays formatted time for each event', () => {
		render(
			<Provider store={mockStore}>
				<EventList />
			</Provider>
		)

		expect(screen.getByText('00:06:160')).toBeInTheDocument()
	})
})
