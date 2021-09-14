export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div className="journal__entry-picture"
                 style={{
                     backgroundSize: 'cover',
                     backgroundImage: 'url(https://www.arsys.es/blog/file/uploads/2017/04/NodeJS.jpg)'
                 }}>
            </div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Un nuevo día
                </p>
                <p className="journal__entry-content">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum est hic nisi qui voluptatem.
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    )
}