import { useQuery } from "react-query";
import { getAllPlayerStats } from "../api/player-request";



export function PlayerInfo(){

    
    const {isLoading, isError, data = []} = useQuery("playercache", getAllPlayerStats);

    if(isLoading){
        return <p>LOADING</p>
    }

    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }

    return <>
        <h1>Player Info</h1>
        
        <table>
            <thead>
                <tr>
                    <th>Player Name</th>
                    <th>Shot Attempts</th>
                    <th>Shots Made</th>
                    <th>Rebounds</th>
                    <th>Assists</th>
                    <th>Blocks</th>
                </tr>
            </thead>
            <tbody>
                {data.map(p => <tr key={Math.random()}><td>{p.fname} {p.lname}</td><td>{p.careerStats.shotAttempts}</td>
                <td>{p.careerStats.madeBaskets}</td><td>{p.careerStats.rebounds}</td><td>{p.careerStats.assists}</td><td>{p.careerStats.blocks}</td></tr>)}
            </tbody>
            
        </table>
    </>
}