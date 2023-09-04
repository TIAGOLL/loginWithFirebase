



const Dashboard = () => {
  return (
    <>
      <div className="w-screen h-screen bg-zinc-400 items-center justify-center">
        <div className="flex flex-wrap items-center justify-center">
          <div>
            {
              data.map((item) => {
                <div className="flex flex-col w-3/12 bg-zinc-100 items-center justify-center">
                  <div>
                    <h1>{item.name}</h1>
                  </div>
                  <div>
                    <h5>{item.content}</h5>
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
