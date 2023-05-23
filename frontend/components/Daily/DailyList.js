import DailyDue from './DailyDue'
import DailyDone from './DailyDone'
import { useState } from 'react'
import { useOptionsContext } from '../../context/option'


const DailyList = ({ dailies }) => {
    const today = new Date()
    today.setHours(24, 0, 0, 0)
    const [options, setOptions] = useOptionsContext()

    const [show, setShow] = useState(true)
    const [opt1, setOpt1] = useState('me')
    const [opt2, setOpt2] = useState('')
    return (
        <>
            <input
                className="daily-icon"
                type="checkbox"
                id="daily-icon"
                name="daily-icon"
                checked={options.optionD}
                onClick={e => {
                    setOptions({
                        optionT: false,
                        optionH: false,
                        optionD: !options.optionD
                    })
                }}
            />

            <label htmlFor="daily-icon" />
            <span className='tooltipD'>
                Dailies
            </span>
            <div className="daily">
                <ul className="pt-5">
                    <h1>DAILIES</h1>

                    <div
                        className={`btn ${opt1}`}
                        onClick={() => {
                            setShow(true);
                            setOpt1('me')
                            setOpt2('')
                        }}>Due
                    </div>
                    <div
                        className={`btn ${opt2}`}
                        onClick={() => {
                            setShow(false)
                            setOpt2('me')
                            setOpt1('')
                        }}>Done
                    </div>
                    {
                        dailies.map(daily => {
                            const date = new Date(daily.iat)
                            if (date < today) {
                                return < DailyDue
                                    key={daily.id}
                                    daily={daily}
                                    show={show}
                                />
                            } else {
                                return <DailyDone
                                    key={daily.id}
                                    daily={daily}
                                    show={show}
                                />
                            }
                        }

                        )
                    }
                </ul>
            </div >
        </>
    )
}

export default DailyList