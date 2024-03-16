import './App.css';
import axios from "axios";
import {useState} from "react";
import getRegionClass from "./helpers/getRegionClass.js";
import roundPopulationMillion from "./helpers/roundPopulationMillion.js";

// (GET)

// Asynchrone functie met async /await want het wel even duren
// Try/catch blok (want het kan altijd misgaan)
// Request axios => GET-request naar endpoint https://restcountries.com/v3.1/all

function App() {

    const [countries, setCountries] = useState([]);
    const [countryInfo, setCountryInfo] = useState({});
    const [searchQuery, setSearchQuery] = useState('')
    const [error,setError] = useState('');
    async function fetchCountries () {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            console.log(response.data);
            response.data.sort((a, b) => {
                return a.population - b.population;
            });

            setCountries(response.data);

        } catch (e){
            console.error(e);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${searchQuery}`);
            const country = (response.data[0]);

            console.log(country)

            setCountryInfo(country)

            setSearchQuery('')

        }
        catch (e) {
            console.error(e);
            setError(`${searchQuery} bestaat niet. Probeer opnieuw`)
        }

    }


    return (
        <>
            <header>
                <img className="worldmap" src='/src/assets/world_map.png' alt="map of world regions"/>
            </header>
            <main>
                <section className="page-section-column">
                <h2>World regions</h2>
                {countries.length > 0
                    ? <ul className="country-list">
                    {countries.map( (country)=> {
                        return (
                            <li key={country.name.common}>
                                <img src={country.flags.svg} alt={`Vlag van ${country.name.common}`} className="flag"/>
                                <span className={getRegionClass(country.region)}> {country.name.common}</span>
                                <p className="population"> Has a population of {country.population} people</p>
                            </li>)
                    })}
                    </ul>
                    : <button className="displayRegions" onClick={fetchCountries} type="button"> Show the World Regions </button>}
                </section>
                <section className="page-section-column">
                    <h2>Search country information</h2>
                    <img className="spinning-globe" src='/src/assets/spinning-globe.gif'
                         alt="spinning globe"/>
                <form className="search-form" onSubmit={handleSubmit}>
                    <input
                        type= "text"
                        id="query-field"
                        name="query"
                        placeholder="Bijvoorbeeld Nederland of Peru"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        />
                    <button type="submit"> Zoek </button>
                        {error && <span id= "error-message"> {error} </span>}
                </form>
                     {
                        Object.keys(countryInfo).length > 0 &&
                        <article className="search-result-box">
                            <span className="flag-title-container">
                                <img src={countryInfo.flags.svg} alt="vlag" className="flag"/>
                                <p> {countryInfo.name.common} is situated in {countryInfo.subregion} and the capital is {countryInfo.capital}.</p>
                                <p>It has a population of {roundPopulationMillion(countryInfo.population)} million people and it borders with {countryInfo.borders.length} countries. </p>
                                <p>Website can be found on <code> {countryInfo.tld [0]} </code> domain's </p>
                            </span>

                        </article>
                    }
                </section>


            </main>
        </>
    )
}

export default App
