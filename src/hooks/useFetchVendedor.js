import { useState, useEffect } from "react";

export const useFetchVendedor = () => {
    const [dados, setDados] = useState(null)
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [vendedorId, setVendedorId] = useState(null);
    const [data, setData] = useState(null);
    const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
    const [isModalFailOpen, setIsModalFailOpen] = useState(false);
    const [isModalDuplicateOpen, setIsModalDuplicateOpen] = useState(false);
    const [limpa, setLimpa] = useState();
    const [action, setAction] = useState();

    const url = "https://octopus-app-8fgh4.ondigitalocean.app/vendedores";

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
            setVendedorId(dados);
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
            setVendedorId(dados.id);
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
            let json;

            if (action === "criar") {
                try {
                    let fetchOptions = [url, config]
                    const res = await fetch(...fetchOptions)
                    json = await res.json();

                    if (res.status === 201) {
                        setIsModalSuccessOpen(true);
                        setLimpa(true);
                    } else if (res.status === 302) {
                        setIsModalDuplicateOpen(true);
                    }
                } catch (error) {
                    setIsModalFailOpen(true);
                }
            } else if (method === "DELETE") {
                const deleteUrl = `${url}/${vendedorId}`;
                const res = await fetch(deleteUrl, config);
                if (res.status === 200) {
                    window.alert("Vendedor deletado com sucesso!");
                    setTimeout(function () {
                        window.location.reload();
                    }, 1);
                }
            } else if (action === "editar") {
                const urlEdit = `${url}/${vendedorId}`;
                const res = await fetch(urlEdit, config)
                if (res.status === 200) {
                    window.alert("Vendedor atualizado com sucesso!");
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