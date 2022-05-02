$("#create-btn").on("click", ev => {
    $("#todo-name").val("");
    $("#create").removeClass("hidden");
    $(".content").scrollTop(0);
});

$("#discard").on("click", ev => {
    $("#create").addClass("hidden")
})

$("#save").on("click", ev => {
    let newItem = $("#todo-name").val();
    let data = load();
    if(newItem == null)
        return;    
    data.unshift(newItem);
    $("#create").addClass("hidden")
    save(data);
    render();
})

const deleteItem = itemIndex => {
    let data = load();
    data.splice(itemIndex, 1);
    save(data);
    render();
    return;
}

const save = items => {
    localStorage.setItem("TODO-APP-ITEMS", JSON.stringify(items || []));
    return;
}

const load = () => {
    return JSON.parse(localStorage.getItem("TODO-APP-ITEMS")) || [];
}


const render = () => {
    let data = load();
    
    $(".list").html("");

    data.forEach((item, index) => {
        $("<div>")
        .addClass("item")
        .append(
            $("<h2>")
            .html(item)
        )
        .append(
            $("<div>")
            .addClass("item-control")
            .append(
                $("<button>")
                .append(`<img class="icon trash" src="assets/trash.svg">`)
                .on("click", ev => deleteItem(index))
            )
        )
        .appendTo(
            $(".list")
        )
    });
    return;
}

$().ready(() => render())