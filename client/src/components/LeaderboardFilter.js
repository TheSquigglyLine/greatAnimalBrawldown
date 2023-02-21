import { useState } from 'react'

const LeaderboardFilter = ({filterAnimals}) => {
    const [text, setText] = useState('')

    const onChange = (event) => {
        event.preventDefault()

        /* if (!text){
            return
        } */
        filterAnimals(text)
    }

    return (
        <div className='form-control'>
            <input
                type='text'
                placeholder='Name'
                value={text}
                onChange={(e) => onChange(e)}
            />
        </div>
    )
}

export default LeaderboardFilter