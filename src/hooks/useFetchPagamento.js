import { useState, useEffect } from "react";

export const useFetchPagamento = () => {
    const [dados, setDados] = useState(null)
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagamentoId, setPagamentoId] = useState(null);
    const [data, setData] = useState(null);
    const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
    const [isModalFailOpen, setIsModalFailOpen] = useState(false);
    const [isModalDuplicateOpen, setIsModalDuplicateOpen] = useState(false);
    const [limpa, setLimpa] = useState();
    const [action, setAction] = useState();

    const url = "http://localhost:8080/pagamentos";

    const httpConfig = (dados, method, action) => {
        setAction(action);
        if (method === "POST") {
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            })

            setMethod(method);
        } else if (method === "DELETE") {
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json",
                }
            })
            setMethod(method);
            setPagamentoId(dados);
        } else if (method === "GET") {
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json",
                }
            })
            setMethod(method);
            setData(dados);
        } else if (method === "PUT") {
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            })

            setMethod(method);
            setPagamentoId(dados.id);
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);

            try {
                const res = await fetch(url);
                const json = await res.json();
                setDados(json);
                if (json.length == 0) {
                    setError("Nenhum vendedor cadastrado");
                }
            } catch (error) {
                setError("Houve um erro ao carregar os dados!");
            }

            setLoading(false);
        }

        fetchData();

    }, [url]);

    useEffect(() => {
        const httpRequest = async () => {

            if (action === "editar") {
                const urlEdit = `${url}/${pagamentoId}`;
                const res = await fetch(urlEdit, config)
                if (res.status === 200) {
                    window.alert("Nova compra registrada com sucesso!");
                    setTimeout(function () {
                        window.location.reload();
                    }, 1);
                }
            }
        }
        httpRequest();
    }, [config, method, url])

    return {
        dados, httpConfig, loading, error, limpa,
        isModalSuccessOpen, setIsModalSuccessOpen,
        isModalFailOpen, setIsModalFailOpen,
        isModalDuplicateOpen, setIsModalDuplicateOpen
    };
};