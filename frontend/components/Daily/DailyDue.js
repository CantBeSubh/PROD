import { useMutation } from "@apollo/client"
// import Button from "../Button3"
import {
    delDailyM,
    checkDailyM,
    getDailyQ
} from "../../gql/queries"

const DailyDue = ({ daily, show }) => {
    const [delDaily, status] = useMutation(delDailyM, {
        refetchQueries: [{ query: getDailyQ }, 'GetDailies']
    })

    const [checkDaily, status2] = useMutation(checkDailyM, {
        refetchQueries: [{ query: getDailyQ }, 'GetDailies']
    })


    const handleDel = () => {
        if (status.loading) return 'Submitting...'
        if (status.error) return `Submission error! ${status.error.message}`
        delDaily({ variables: { id: daily.id } })
    }

    const handleCheck = () => {
        if (status2.loading) return 'Submitting...'
        if (status2.error) return `Submission error! ${status.error.message}`
        checkDaily({ variables: { id: daily.id } })
    }

    if (show) {
        return (
            <li>
                <a on onClick={handleCheck}>{daily.name}</a>
                <span onClick={handleDel}> X </span>
            </li>

        )
    }
}

export default DailyDue