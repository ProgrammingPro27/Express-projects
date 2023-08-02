function ListContainer(parent, type, containerName) {
    this.wrapper = document.createElement("DIV");
    this.wrapper.className = "userContainer"

    let listHeader = document.createElement("DIV");
    listHeader.className = "listHeader"

    let exitText = document.createElement("H2");
    exitText.innerHTML = `Room:</br>${containerName}`;

    let exitIcon = document.createElement("I");
    exitIcon.classList = "fa-solid fa-person-walking-arrow-right"
    exitIcon.innerHTML += "...EXIT"
    let exitLink = document.createElement("A");

    exitLink.classList = "exitIcon"
    exitLink.href = "/"

    exitLink.appendChild(exitIcon)

    listHeader.appendChild(exitText)
    listHeader.appendChild(exitLink)

    this.list = document.createElement(type)
    this.list.className = "list"

    this.wrapper.appendChild(listHeader)
    this.wrapper.appendChild(this.list)
    parent.appendChild(this.wrapper)
};

ListContainer.prototype.addUserId = function (userId) {
    let liEl = document.createElement("LI");
    liEl.classList = "listElement"
    liEl.textContent = userId
    this.list.appendChild(liEl)
    return this;
};
