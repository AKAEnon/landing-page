import { useState } from "react";

export default function LoginTest() {
    const [username, setUsername] = useState("emilys");
    const [token, setToken] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    password: "emilyspass",
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setToken(data.token || data.accessToken);
                alert("Login realizado!");
            } else {
                alert("Erro no login: " + data.message);
            }
        } catch (error) {
            alert("Erro na requisição.");
        }
    };

    const handleGetAuthData = async () => {
        try {
            const response = await fetch("https://dummyjson.com/auth/me", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data);
                alert(`Eita! é a ${data.firstName} ${data.lastName}`);
            } else {
                alert("Erro na autenticação: " + data.message);
            }
        } catch (error) {
            alert("Erro na requisição.");
        }
    };

    return (
        <div style={{ padding: "20px", background: "#f5f5f5", margin: "20px", borderRadius: "5px" }}>
            <h3>Área de Testes API</h3>

            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <button type="button" onClick={handleLogin}>Fazer Login</button>
                <button type="button" onClick={handleGetAuthData}>Buscar Dados</button>
            </div>

            <p style={{ fontSize: "12px", wordBreak: "break-all" }}>
                <strong>Token:</strong> {token || "Nenhum"}
            </p>
        </div>
    );
}