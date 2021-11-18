import FilterCheckBox from '../FilterCheckBox/FilterCheckBox'
import './SearchForm.css'

function SearchForm() {
    return (
        <section className="search-form">
            <form className="search-form__form">
                <div className="search-form__container">
                    <input className="search-form__input" placeholder="Фильм" required />
                    <button className="search-form__submit" type="submit">Поиск</button>
                </div>
                <FilterCheckBox />
            </form>
        </section>
    )
}

export default SearchForm;