export default function Home() {
  return (
    <main>
      <h1>Todo App</h1>
      <p>API URL : {process.env.NEXT_PUBLIC_API_URL}</p>
    </main>
  )
}