from livereload import Server

server = Server()

server.watch("index.html")
server.watch("css/")
server.watch("img/")

server.serve(root=".", port=5500)
