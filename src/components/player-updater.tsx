import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CareerStats, getAllPlayerIds, updatePlayer } from "../api/player-request";

export type UpdateForm = CareerStats & {playerId:number}


export function PlayerUpdater(){

    const [form,setForm] = useState<UpdateForm>({shotAttempts:0,madeBaskets:0, rebounds:0, assists:0, blocks:0, playerId:0})
    
    const queryClient = useQueryClient();// will get us access to the query client object in the app.tsx
    const {data = []} = useQuery("playerIdcache", getAllPlayerIds);

    // mutations are when you change the data. Anything other than a read
    const createPlayerMutation = useMutation(updatePlayer, {
        onSuccess: () => queryClient.invalidateQueries("playercache") // whenever we successfully create a player. React Query will automatically refresh the players cache
    });

    function updateStats(){
        const updatePlayer: UpdateForm ={
            playerId:form.playerId,
            shotAttempts:form.shotAttempts,
            madeBaskets:form.madeBaskets,
            rebounds:form.rebounds,
            assists:form.assists,
            blocks:form.blocks
            }
        
        createPlayerMutation.mutate(updatePlayer);
    }
    
    return <>

        <fieldset>
            <legend>Player to Update</legend>
            <label htmlFor="idInput">Player Id</label>
            
            <select name="idInput" id="idInput" data-testid="idInput" onChange={e=>setForm({...form, playerId:Number(e.target.value)})}>
                {data.map(p=> <option value={p.playerId} key={p.playerId}>{p.fname} {p.lname}</option>)}
            </select>

            <label htmlFor="addShots">Shot Attempts</label>
            <input  id="addShots" type="number" placeholder="10" onChange={e=>setForm({...form, shotAttempts:Number(e.target.value)})}/>

            <label htmlFor="addShotsMade">Baskets Made</label>
            <input  id="addShotsMade" type="number" placeholder="12" onChange={e=>setForm({...form, madeBaskets:Number(e.target.value)})}/>
            
            <label htmlFor="addRebounds">Rebounds</label>
            <input  id="addRebounds" type="number" placeholder="16" onChange={e=>setForm({...form, rebounds:Number(e.target.value)})}/>
            
            <label htmlFor="addAssists">Assits</label>
            <input  id="addAssists" type="number" placeholder="15" onChange={e=>setForm({...form, assists:Number(e.target.value)})}/>
            
            <label htmlFor="addBlocks">Blocks</label>
            <input  id="addBlocks" type="number" placeholder="18" onChange={e=>setForm({...form, blocks:Number(e.target.value)})}/>
        </fieldset>

        <button onClick={updateStats} >Update Player</button>
    
    
    </>

}