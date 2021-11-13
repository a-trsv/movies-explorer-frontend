import './FilterCheckBox.css';

function FilterCheckBox() {
    return (
        <div className="filter-checkbox">
            <label className="filter-checkbox__switch">
                <input className="filter_checkbox__input" id="slider-box" type="checkbox"/>
                <span className="filer-checkbox__slider filter-checkbox__round"></span>
             </label>
            <label htmlFor='slider-box' className="filter-checkbox__span">Короткометражки</label>
        </div>
    )
}

export default FilterCheckBox;