import React from 'react'
import FilterCheckBox from '../FilterCheckBox/FilterCheckBox'
import './SearchForm.css'

function SearchForm({
    handleSearchData,
    checkBoxChecked,
    handleCheckBoxChange
}) {
    const [searchData, setSearchData] = React.useState('')
    const [searchDataError, setSearchDataError] = React.useState('Нужно ввести ключевое слово')
    const [formIsValid, setFormIsValid] = React.useState(false)

    function handleChange(evt) {
        setSearchData(evt.target.value)
        if (evt.target.value < 1 || evt.target.value.length > 999) {
            setSearchDataError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте еще раз')
        } else {
            setSearchDataError('')
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        handleSearchData(searchData)
        setSearchData('')
    }

    React.useEffect(() => {
        if (searchDataError || searchData.length < 0) {
            setFormIsValid(false)
        } else {
            setFormIsValid(true)
        }
    }, [searchDataError, searchData])

    return (
        <section className="search-form">
            <form
                className="search-form__form"
                onSubmit={handleSubmit}
            >
                <div className="search-form__container">
                    <input
                        className="search-form__input"
                        placeholder="Фильм"
                        minLength="1"
                        maxLength="999"
                        onChange={handleChange}
                        value={searchData}
                        required

                    />
                    <button
                        className={`${formIsValid ? 'search-form__submit' : 'search-form__submit_disabled'}`}
                        type="submit"
                        disabled={!formIsValid}
                    >
                        Поиск
                        </button>
                </div>
                {searchDataError && <p id="search-form-span-error" className="search-form__span-error">{searchDataError}</p>}
                <FilterCheckBox
                    checkBoxChecked={checkBoxChecked}
                    handleCheckBoxChange={handleCheckBoxChange}
                />
            </form>
        </section>
    )
}

export default SearchForm;