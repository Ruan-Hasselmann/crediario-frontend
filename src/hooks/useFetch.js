import { useState, useEffect } from "react";

export const useFetch = (url) => {
    const [dados, setDados] = useState(null)
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [clienteId, setClienteId] = useState(null);
    const [data, setData] = useState(null);
    const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
    const [isModalFailOpen, setIsModalFailOpen] = useState(false);
    const [isModalDuplicateOpen, setIsModalDuplicateOpen] = useState(false);
    const [limpa, setLimpa] = useState();
    const [action, setAction] = useState();

    const [pagar, setPagar] = useState({
        id: '',
        valor: '',
        dataProx: ''
    });

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
            setPagar(dados);
        } else if (method === "DELETE") {
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json",
                }
            })
            setMethod(method);
            setClienteId(dados);
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
                    "Content-Type": "application/json",
                }
            })
            setMethod(method);
            setClienteId(dados);
        } else if (method === "PATCH") {
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            })

            setMethod(method);
            setClienteId(dados.id);
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
                    setError("Nenhum cliente cadastrado");
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
            let json;

            if (action === "criar") {
                try {
                    let fetchOptions = [url, config]
                    const res = await fetch(...fetchOptions)
                    json = await res.json();
                    console.log(res);

                    if (res.status === 201) {
                        setIsModalSuccessOpen(true);
                        setLimpa(true);
                    } else if (res.status === 302) {
                        setIsModalDuplicateOpen(true);
                    }
                } catch (error) {
                    setIsModalFailOpen(true);
                }
            } else if (action === "data") {
                setError(null);
                setLoading(true);
                const searchUrl = `${url}/data/${data}`;
                const res = await fetch(searchUrl, config);
                json = await res.json();
                setDados(json);
                setLoading(false);

                if (json.length == 0) {
                    setError("Nenhum cliente encontrado para essa data de pagamento!");
                }
            } else if (method === "DELETE") {
                const deleteUrl = `${url}/${clienteId}`;
                const res = await fetch(deleteUrl, config);
                if (res.status === 200) {
                    window.alert("Cliente deletado com sucesso!");
                    setTimeout(function () {
                        window.location.reload();
                    }, 1);
                }
            } else if (action === "ativar") {
                const putUrl = `${url}/${clienteId}/ativar`;
                const res = await fetch(putUrl, config);
                if (res.status === 200) {
                    window.alert("Cliente ativado com sucesso!");
                    setTimeout(function () {
                        window.location.reload();
                    }, 1);
                }
            } else if (action === "cpf") {
                console.log(action)
                setError(null);
                setLoading(true);
                const searchUrl = `${url}/cpf/${data}`;
                const res = await fetch(searchUrl, config);
                json = await res.json();
                setDados(json);
                setLoading(false);
                console.log(json);

                if (json.length == 0) {
                    setError("Nenhum cliente encontrado para essa data de pagamento!");
                }

                setCallFetch(json);
            } else if (action === "pagar") {
                try {
                    const urlPagar = `${url}?id=${pagar.id}&dataProximo=${pagar.dataProx}&valor=${pagar.valor}`;
                    const res = await fetch(urlPagar, config)
                    console.log(res);

                    if (res.status === 200) {
                        window.alert("Pagamento registrado com sucesso!")
                        setTimeout(function () {
                            window.location.reload();
                        }, 1);
                    }
                } catch (error) {
                    setIsModalFailOpen(true);
                }
            } else if (action === "editar") {
                const urlEdit = `${url}/${clienteId}`;
                const res = await fetch(urlEdit, config)
                if (res.status === 200) {
                    window.alert("Cliente atualizado com sucesso!");
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