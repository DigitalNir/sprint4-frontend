const ActionList = ({ listType, data }) => {
    const renderListItems = (items) => {
        return items.map((item) => {
            switch (listType) {
                case 'likers':
                    return <li key={item._id}>{item.fullname}</li>
                case 'followers':
                    return <li key={item._id}>{item.fullname}</li>
                case 'following':
                    return <li key={item._id}>{item.fullname}</li>
                default:
                    return null
            }
        })
    }

    return (
        <div>
            <ul>{renderListItems(data)}</ul>
        </div>
    )
}

export default ActionList
