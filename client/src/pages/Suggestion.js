import AnimalSuggestionForm from "../components/AnimalSuggestionForm"

const Suggestion = () => {
    return (
        <main id="page-wrap">
            <h1 className="header">Suggest A New Animal</h1>
            <div className="container">
                <AnimalSuggestionForm />
            </div>
        </main>
    )
}

export default Suggestion