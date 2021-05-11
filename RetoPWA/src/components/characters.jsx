import { useEffect, useState } from "react"

const Characters = () => {
    const [Characters, setCharacters] = useState();
    
    useEffect(() => {
        fetch("http://gateway.marvel.com/v1/public/characters?ts=1&apikey=733b13dbbc55059c475b5f621ffb7f8c&hash=e5b3a7c846a93a1c06cd63c540a11fb4").then(result => result.json()).then(
            (result) => {
                console.log(result.data.results)
                setCharacters(result.data.results)
            }
        );
    }, []);
    return (
        <div>
            <h1>Marvel characters</h1>
        </div >
    )
}
export default Characters;