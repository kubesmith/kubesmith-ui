package main

import (
	"flag"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path"
	"strings"
)

var currentDirectory string
var directory *string
var port *string
var cachedMain string

func replaceEnvironmentVariables(text string) string {
	keys := []string{
		"API_URL",
		"WEBSOCKET_URL",
	}

	for _, key := range keys {
		text = strings.Replace(text, fmt.Sprintf("@@%s@@", key), os.Getenv(key), -1)
	}

	return text
}

func handleFileRequest(w http.ResponseWriter, r *http.Request) {
	request := strings.TrimLeft(r.URL.Path, "/")
	filePath := path.Join(*directory, request)

	if request == "" {
		sendIndexFile(*directory, w)
		return
	} else if _, err := os.Stat(filePath); os.IsNotExist(err) {
		sendIndexFile(*directory, w)
		return
	}

	extension := path.Ext(filePath)

	if extension == ".js" {
		sendJSFile(filePath, w)
	} else if extension == ".css" {
		sendRawFile("text/css", filePath, w)
	} else {
		sendRawFile(getFileContentType(filePath), filePath, w)
	}
}

func getFileContentType(filePath string) string {
	file, err := os.Open(filePath)
	if err != nil {
		return "text/plain"
	}

	defer file.Close()
	buffer := make([]byte, 512)

	if _, err := file.Read(buffer); err != nil {
		return "text/plain"
	}

	return http.DetectContentType(buffer)
}

func sendJSFile(filePath string, w http.ResponseWriter) {
	buffer, err := ioutil.ReadFile(filePath)
	if err != nil {
		return
	}

	text := replaceEnvironmentVariables(string(buffer))

	w.Header().Set("Content-Type", "text/javascript")
	w.Write([]byte(text))
}

func sendRawFile(contentType, filePath string, w http.ResponseWriter) {
	file, err := os.Open(filePath)
	if err != nil {
		return
	}

	defer file.Close()
	w.Header().Set("Content-Type", contentType)
	io.Copy(w, file)
}

func sendIndexFile(directory string, w http.ResponseWriter) {
	filePath := path.Join(directory, "index.html")
	sendRawFile("text/html", filePath, w)
}

func main() {
	currentDirectory, _ = os.Getwd()
	port = flag.String("p", "8080", "port to serve on")
	directory = flag.String("d", ".", "the directory of static file to host")
	flag.Parse()

	http.HandleFunc("/", handleFileRequest)

	log.Printf("Serving %s on HTTP port: %s\n", *directory, *port)
	log.Fatal(http.ListenAndServe(":"+*port, nil))
}
