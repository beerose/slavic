defmodule SlavicWeb.GameChannel do
  use Phoenix.Channel
  use GenServer
  alias Slavic.GameState
  alias Slavic.GameStateGenserver

  def join("lobby:init", message, socket) do
    players = GameState.players()
    
    with {:ok, pid} <- GameStateGenserver.start_link(:init_game)
      do send pid, :start_game end

    send(self(), {:after_join, message})
    {:ok, %{players: players}, socket}
  end

  def join("players:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def left("lobby:init", message, socket) do
    players = GameState.players()
    send(self(), {:after_left, message})
    {:ok, %{players: players}, socket}
  end

  def handle_info({:after_left, _message}, socket) do
    player_id = socket.assigns.player_id
    player = %{id: player_id}
    player = GameState.put_player(player)
    # TO DO
    broadcast! socket, "player:joined", %{player: player}
    {:noreply, socket}
  end

  def handle_info({:after_join, _message}, socket) do
    player_id = socket.assigns.player_id
    player = %{id: player_id, join_time: System.system_time(:second)}
    IO.inspect(player)
    player = GameState.put_player(player)
    # TO DO
    broadcast! socket, "player:joined", %{player: player}
    {:noreply, socket}
  end

  def handle_in("player:left", %{ }, socket) do
   # IO.inspect(player <> "arrived")
    player_id = socket.assigns.player_id

    GameState.delete_player(player_id)
    broadcast! socket, "player:left", %{player: GameState.players()}
    IO.inspect(GameState.players())
    {:noreply, socket}
  end

  def handle_in("player:send_message", %{"message" => message}, socket) do
    player_id = socket.assigns.player_id

    broadcast! socket, "player:send_message", %{player: %{message: message, author: player_id}}
    {:noreply, socket}
  end

  def handle_in("player:hero_init", %{"playerState" => kind }, socket) do
    player_id = socket.assigns.player_id
    player = player_id |> GameState.get_player
    |> Map.put( :kind, kind)
    |> GameState.update_player()

    broadcast! socket, "player:init_heroes", %{player: GameState.players()}
    IO.inspect(GameState.players())
    {:noreply, socket}
  end

end