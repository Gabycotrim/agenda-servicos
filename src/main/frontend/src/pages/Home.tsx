
function Home() {
    return (
        <div className="space-y-6">
            <section className="rounded-xl bg-gradient-to-r from-blue-800 to-blue-600 p-6 text-white shadow-md sm:p-10">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-100">
                    Sistema de gerenciamento
                </p>

                <h1 className="text-3xl font-bold sm:text-4xl">
                    Agenda de Serviços
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-6 text-blue-50 sm:text-base">
                    Bem-vindo ao sistema de gerenciamento de usuários,
                    permissões e serviços. Utilize o menu para acessar as
                    funcionalidades disponíveis.
                </p>
            </section>

            <section>
                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                    Funcionalidades do sistema
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-xl">
                            👥
                        </div>
                        <h3 className="font-semibold text-gray-800">
                            Usuários
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            Cadastre, consulte, edite e exclua usuários.
                        </p>
                    </article>

                    <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-xl">
                            🔐
                        </div>
                        <h3 className="font-semibold text-gray-800">
                            Permissões
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            Consulte as permissões disponíveis no sistema.
                        </p>
                    </article>

                    <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-xl">
                            ⚙️
                        </div>
                        <h3 className="font-semibold text-gray-800">
                            Atribuição de permissões
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            Gerencie as permissões associadas a cada usuário.
                        </p>
                    </article>
                </div>
            </section>
        </div>
    );
}

export default Home;
