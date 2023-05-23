import { useMutation } from "@apollo/client"
import Button from "../Button2"
import {
    delDailyM,
    getDailyQ,
    uncheckDailyM
} from "../../gql/queries"

const DailyDone = ({ daily, show }) => {
    const [delDaily, status] = useMutation(delDailyM, {
        refetchQueries: [{ query: getDailyQ }, 'GetDailies']
    })
    const [uncheckDaily, status2] = useMutation(uncheckDailyM, {
        refetchQueries: [{ query: getDailyQ }, 'GetDailies']
    })

    const handleUncheck = () => {
        if (status.loading) return 'Submitting...'
        if (status.error) return `Submission error! ${status.error.message}`
        uncheckDaily({ variables: { id: daily.id } })
    }

    const handleDel = () => {
        if (status.loading) return 'Submitting...'
        if (status.error) return `Submission error! ${status.error.message}`
        delDaily({ variables: { id: daily.id } })
    }

    if (!show) {
        return (
            <li>
                <a on onClick={handleUncheck}>{daily.name}</a>
                <span onClick={handleDel} className="X"> X </span>
            </li>

        )
    }
}

export default DailyDone