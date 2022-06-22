import Daily from './Daily'

const DailyList = ({ dailies }) => {
    return (
        <ul>
            {
                dailies.map(daily =>
                    <Daily
                        key={daily.id}
                        daily={daily}
                    />
                )
            }
        </ul>
    )
}

export default DailyList