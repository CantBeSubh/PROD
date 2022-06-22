import { useMutation } from "@apollo/client"
import Button from "../Button2"
import {
    delDailyM,
    getDailyQ
} from "../../gql/queries"

const Daily = ({ daily }) => {
    const [delDaily, status] = useMutation(delDailyM, {
        refetchQueries: [{ query: getDailyQ }, 'GetDailies']
    })

    const handleCheck = () => {
        if (status.loading) return 'Submitting...'
        if (status.error) return `Submission error! ${status.error.message}`

    }

    const handleDel = () => {
        if (status.loading) return 'Submitting...'
        if (status.error) return `Submission error! ${status.error.message}`
        delDaily({ variables: { id: daily.id } })
    }
    return (
        <li>
            {daily.name}
            <Button onClick={handleDel}> X </Button>
        </li>
    )
}

export default Daily