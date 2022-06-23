import { useMutation } from "@apollo/client"
import Button from "../Button2"
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
                {daily.name} | {new Date(daily.iat).toLocaleDateString()}
                <Button onClick={handleCheck}> ✔ </Button>
                <Button onClick={handleDel}> X </Button>
            </li>

        )
    }
}

export default DailyDue