defmodule Slavic.GameState do
    @moduledoc """
      This module holds the game current state. It also contains the game logic.
      Allows to add new players to the board, move them and detect collisions.
      The first method is required for the supervisor tree to automatically 
      create an agent when the application starts up. 
    """
  
    @doc """
      Used by the supervisor to start the Agent that will keep the game state persistent.
      The initial value passed to the Agent is an empty map.
    """
    def start_link do
      Agent.start_link(fn -> %{} end, name: __MODULE__)
    end
    
    @doc """
     Put a new player in the map
    """
    def put_player(player) do
      Agent.update(__MODULE__, &Map.put_new(&1, player.id, player))
      player
    end

    @doc """
      Retrieve a player from the map
    """
    def get_player(player_id) do
      Agent.get(__MODULE__, &Map.get(&1, player_id))
    end

    def delete_player(player_id) do
        Agent.update(__MODULE__, &Map.delete(&1, player_id))
    end

    @doc """
      Update the player information in the map
    """
    def update_player(player) do
      Agent.update(__MODULE__, &Map.put(&1, player.id, player))
      player
    end

    @doc """
     Get all the players in the map
    """
    def players do
      Agent.get(__MODULE__, &(&1))
    end

end