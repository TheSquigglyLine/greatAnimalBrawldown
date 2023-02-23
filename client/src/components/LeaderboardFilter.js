import { useState } from 'react'

const LeaderboardFilter = ({ animals, setFilteredAnimals }) => {
    const [text, setText] = useState('')

    const onChange = (event) => {
        event.preventDefault()
        setText(event.target.value.toLowerCase())

        if (!event.target.value) {
            setFilteredAnimals(animals)
            console.log('empty')
            return
        }
        filterAnimals(event.target.value)
    }

    const filterAnimals = async (filter) => {
        const filteredList = animals.filter((item) => {
            return item === filter.toLowerCase() || item.name.toLowerCase().includes(filter.toLowerCase());
        });
        setFilteredAnimals(filteredList)
    }

    return (
        <div class="form__group field">
            <input
                class="form__field" 
                placeholder="Name" 
                name="name" 
                id='name' 
                required
                type='input'
                value={text}
                onChange={onChange}
            />
            <label for="name" class="form__label">Name</label>
        </div>
    )
}

export default LeaderboardFilter