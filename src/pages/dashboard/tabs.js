export const tabs = [
    {
        tabName: 'Operadores',
        role: ['ROLE_ADMINISTRADOR'],
        url: '/operator'
    },
    {
        tabName: 'Pessoas',
        role: ['ROLE_GERENTE', 'ROLE_ANALISTA'],
        editPerson: ['ROLE_GERENTE'],
        url: '/person'
    }
]