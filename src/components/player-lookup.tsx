import { useEffect, useState } from "react";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { BasketballPlayer, getAllPlayerByLastName } from "../api/player-request";

type PlayerName = {lname:string}
type Players = {fname:string, lname:string, bioMetrics:{heightInches:number}}

export function PlayerLookup(){

    const qClient = useQueryClient();
    const [player,setPlayerName] = useState<PlayerName>({lname:"!"});
    const [playerName,setName] = useState<string>("!");

    const {data:players = []} = useQuery(["playercache2", playerName], ()=>getAllPlayerByLastName(playerName))

    function fetchPlayers(){
        setName(player.lname)
        qClient.invalidateQueries("playercache2")
    }
        

    return <>
        <fieldset>
            <legend>Get Players By Last Name</legend>
            <label htmlFor="lastName">Shot Attempts</label>
            <input  id="lastName" type="string" placeholder="Swoop" onChange={e=>setPlayerName({...player, lname:e.target.value})}/>
        </fieldset>
        <button onClick={fetchPlayers} >Get Players</button>
        {players.length === 0 ? <><p>Nothing to see here.</p></>:<>
        <h1>Player Info</h1>
        
        <table>
            <thead>
                <tr>
                    <th>Player Name</th>
                    <th>Height</th>
                    
                </tr>
            </thead>
            <tbody>
                {players.map(p => <tr key={Math.random()}><td>{p.fname} {p.lname}</td><td>{p.bioMetrics.heightInches}</td></tr>)}
            </tbody>
            
        </table></>
        }
    </>
}