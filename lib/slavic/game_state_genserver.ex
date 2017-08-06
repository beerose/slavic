defmodule Slavic.GameStateGenserver do
    @moduledoc """
        genserver for handling users activity
    """
    use GenServer
    alias Slavic.GameState

    def monitor_TIME, do: 30
    def disactive_TIME, do: 600

    def start_link(name) do
        # name must be atom
        GenServer.start_link(__MODULE__, [], name: name)
    end

    def handle_info(:start_game, state) do
        GameState.players() |>
        Enum.map(fn(player) -> 
            if player.last_action > System.system_time(:second) - disactive_TIME,
            do: GameState.delete(player.id)
            end)
        schedule_work()
        {:noreply, state}
    end

    defp schedule_work() do
       Process.send_after(self(), :start_game, monitor_TIME * 1000) # 1 minute 
    end
end