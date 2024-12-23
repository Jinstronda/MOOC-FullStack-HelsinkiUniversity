# Single Page Diagram
```mermaid
sequenceDiagram
    title Reloading Page
    participant browser
    participant server 

    Note right of browser: User Reloads Website

    activate browser
    browser->>server: GET HTML spa
    activate server
    server->>browser:200 OK.
    deactivate server
    activate browser
    browser->>server: GET main.css
    activate server 
    server->>browser: 200 OK.
    deactivate server
    browser->>server: GET  space.js
    activate server 
    server->>browser: 200 OK.
    deactivate server
    browser->>server: GET data.json 
    activate server 
    server->>browser: 200 OK.
    deactivate server
    deactivate browser 


   