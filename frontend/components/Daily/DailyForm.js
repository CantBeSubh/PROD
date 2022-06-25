import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { addDailyM, getDailyQ } from '../../gql/queries'

import { useAuthContext } from '../../context/auth'

import Input from '../Input2'


const DailyForm = () => {
    const [auth] = useAuthContext()
    const [daily, setDaily] = useState({ name: '', uid: auth })
    const [addDaily, status] = useMutation(addDailyM, {
        refetchQueries: [{ query: getDailyQ }, 'GetDailies']
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        if (status.loading) return 'Submitting...'
        if (status.error) return `Submission error! ${status.error.message}`
        daily.uid = auth
        addDaily({ variables: daily })
        setDaily({ ...daily, name: '' })
    }
    return (
        <form onSubmit={handleSubmit} className='form-group '>
            <Input
                label="Daily"
                type="text"
                value={daily.name}
                onChange={e => setDaily({ ...daily, name: e.target.value })}
            />

            <i className="input-icon uil uil-plus"></i>

            {/* <Button type='submit'>+</Button> */}
        </form>
    )
}

export default DailyForm