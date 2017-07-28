defmodule SlavicWeb.PageController do
  use SlavicWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
