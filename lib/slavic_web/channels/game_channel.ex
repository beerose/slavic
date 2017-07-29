defmodule SlavicWeb.GameChannel do
  use Phoenix.Channel

  alias Slavic.GameState

  def join("lobby:init", message, socket) do
    players = GameState.players()
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
    player = %{id: player_id}
    player = GameState.put_player(player)
    # TO DO
    broadcast! socket, "player:joined", %{player: player}
    {:noreply, socket}
  end

  def handle_in("player:left", %{player: player}, socket) do
    IO.inspect(player <> "arrived")
    player_id = socket.assigns.player_id
    IO.inspect("######################################y##########")
    IO.inspect(player_id)
    IO.inspect("################################################")

    GameState.delete_player(player_id)
    broadcast! socket, "player:left", %{player: player_id}
    {:noreply, socket}
end
end