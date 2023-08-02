function UserInterface(parent) {
    this.socket = io();
    this.wrapper = document.createElement("DIV")
    this.wrapper.className = "menuWrapper"
    this.rooms = {}
    this.sideMenuContentWrapper = document.createElement("DIV");
    this.sideMenuContentWrapper.className = "sideMenuContentWrapper"

    this.wrapper.appendChild(this.sideMenuContentWrapper)

    let sideMenuControl = document.createElement("DIV");
    sideMenuControl.className = "sideMenuControl"

    let hamburgerMenu = document.createElement("I");
    hamburgerMenu.classList = "fa-solid fa-bars hamburgerMenu"
    hamburgerMenu.style.color = "white"
    sideMenuControl.appendChild(hamburgerMenu)

    let addRoomWrapper = document.createElement("DIV");
    addRoomWrapper.classList = "addRoomWrapper"

    let createRoom = document.createElement("I");
    createRoom.classList = "fa-solid fa-circle-plus hamburgerMenu"

    let roomNameField = document.createElement("input");
    roomNameField.classList = "roomNameField"
    roomNameField.maxLength = 6
    roomNameField.placeholder = "Room name..."

    addRoomWrapper.appendChild(roomNameField)
    addRoomWrapper.appendChild(createRoom)

    sideMenuControl.appendChild(addRoomWrapper)

    let curr = this;

    createRoom.addEventListener("click", function () {
        if (roomNameField.value != "") {
            curr.createSideMenu(roomNameField.value)
            curr.socket.emit("create room", roomNameField.value)
        }
        roomNameField.value = ""
    })

    parent.appendChild(sideMenuControl)
    let wrapp = this.wrapper

    hamburgerMenu.addEventListener("click", function () {
        if (hamburgerMenu.style.color == "white") {
            hamburgerMenu.style.color = "#696969"
            wrapp.style.marginLeft = `-100%`
            addRoomWrapper.style.width = "55px"
        } else {
            hamburgerMenu.style.color = "white"
            wrapp.style.marginLeft = `0%`
            addRoomWrapper.style.width = "fit-content"
        }
    })
    parent.appendChild(this.wrapper)
}

UserInterface.prototype.createSideMenu = function (name) {
    if (!this.rooms[name]) {
        this.rooms[name] = true;
        let subMenu = document.createElement("DIV")
        subMenu.className = "subMenuWrapper"

        let layerName = document.createElement("DIV");
        layerName.className = "layerName"
        layerName.textContent = name

        let roomLinkElement = document.createElement("a");
        roomLinkElement.href = "/" + name

        let showHideButton = document.createElement("I");
        showHideButton.classList = "fa-solid fa-right-to-bracket subMenuWrapperShowHideButton"
        roomLinkElement.appendChild(showHideButton)

        subMenu.appendChild(layerName)
        subMenu.appendChild(roomLinkElement)

        this.sideMenuContentWrapper.appendChild(subMenu)
    }
    return this;
};