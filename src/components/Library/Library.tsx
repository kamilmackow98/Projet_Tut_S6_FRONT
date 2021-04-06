import React, { useEffect, useState } from "react"
import UserContext from "context/user/UserContext";
import { Game, Library } from "types";
import Cookies from "js-cookie";

interface Props {
};

const Library = () => {

    const { user, setUser } = React.useContext(UserContext);
    const [games, setGames] = useState<Game[] | []>([]);
    
    useEffect(() => {
        if (user.authenticated) {
            const token: string | undefined = Cookies.get('token');
            fetch(`/api/user/library`, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": token ? token : ""
                }
            })
                .then(response => response.json())
                .then((response: Library) => {
                    const ids: number[] = [];
                    response.library.forEach((gameId: number) => ids.push(gameId));
                    fetchGames(1, ids);
                }).catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    const fetchGames = (page: number, ids: number[]) => {

    }

    return (<div></div>)
}

export default Library;
