const filterForm = document.getElementById('filter-cards');
filterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    axios.get("http://cards.danit.com.ua/cards", authConfig).then(function (response) {
        if (response.status === 200) {
            cards = response.data;
            filter();
        } else {
            alert(`${response.status}: ${response.statusText}`);
        }
    })
        .catch(function (error) {
            console.log(error);
        });
});

function filter() {
    const targetFilter = document.getElementById('filter-title').value.toLowerCase();
    const statusFilter = document.getElementById('filter-status').value;
    const priorityFilter = document.getElementById('filter-priority').value;

    filtred = cards.filter((item) => {
        return ((item.title.toLowerCase().includes(targetFilter)
            || item.description.toLowerCase().includes(targetFilter)) &&
            item.status === statusFilter &&
            item.priority === priorityFilter);
    });
    creatCards(filtred);
}
