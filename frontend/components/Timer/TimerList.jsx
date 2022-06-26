import Timer from './Timer'

const TimerList = ({ entries }) => {
    return (
        <>
            <input
                className="timer-icon"
                type="checkbox"
                id="timer-icon"
                name="timer-icon"
            />
            <label htmlFor="timer-icon" />
            <span className='tooltipH'>
                Timer
            </span>
            <div className="timer">
                <ul className="pt-5">
                    {
                        entries.map(entry =>
                            <Timer entry={entry} key={entry.id} />
                        )
                    }
                </ul>
            </div>
        </>
    )
}

export default TimerList