import type { ConfigMap } from "@/architecture/types";

const estados = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
const rawBrackets = [
  ["I",1,0,180000,0.04,0],["I",2,180000.01,360000,0.073,5940],["I",3,360000.01,720000,0.095,13860],["I",4,720000.01,1800000,0.107,22500],["I",5,1800000.01,3600000,0.143,87300],["I",6,3600000.01,4800000,0.19,378000],
  ["II",1,0,180000,0.045,0],["II",2,180000.01,360000,0.078,5940],["II",3,360000.01,720000,0.1,13860],["II",4,720000.01,1800000,0.112,22500],["II",5,1800000.01,3600000,0.147,85500],["II",6,3600000.01,4800000,0.3,720000],
  ["III",1,0,180000,0.06,0],["III",2,180000.01,360000,0.112,9360],["III",3,360000.01,720000,0.135,17640],["III",4,720000.01,1800000,0.16,35640],["III",5,1800000.01,3600000,0.21,125640],["III",6,3600000.01,4800000,0.33,648000],
  ["IV",1,0,180000,0.045,0],["IV",2,180000.01,360000,0.09,8100],["IV",3,360000.01,720000,0.102,12420],["IV",4,720000.01,1800000,0.14,39780],["IV",5,1800000.01,3600000,0.22,183780],["IV",6,3600000.01,4800000,0.33,828000],
  ["V",1,0,180000,0.155,0],["V",2,180000.01,360000,0.18,4500],["V",3,360000.01,720000,0.195,9900],["V",4,720000.01,1800000,0.205,17100],["V",5,1800000.01,3600000,0.23,62100],["V",6,3600000.01,4800000,0.305,540000],
] as const;

export const defaultConfiguration: ConfigMap = {
  general: { platform_name: "Nicemp", locale: "pt-BR", feature_flags: { roi: true, markup: true, simples_nacional: true, admin_configuration: true }, validation_messages: { required: "Campo obrigatório.", invalid_number: "Informe um número válido." } },
  financial: {
    default_currency: "BRL",
    roi: { investment: { key: "investment", min: 0, max: null, inclusive_min: false, inclusive_max: true, message: "Informe um valor de investimento válido maior que zero." }, return_value: { key: "return_value", min: 0, max: null, inclusive_min: true, inclusive_max: true, message: "Informe um retorno válido não negativo." }, labels: { investment: "Investimento", return_value: "Retorno" }, help_texts: { investment: "Valor total investido.", return_value: "Valor total retornado pelo investimento." } },
    markup: { cost: { key: "cost", min: 0, max: null, inclusive_min: false, inclusive_max: true, message: "Informe um custo válido maior que zero." }, expenses_percent: { key: "expenses_percent", min: 0, max: 100, inclusive_min: true, inclusive_max: false, message: "Informe um percentual de despesas válido." }, margin_percent: { key: "margin_percent", min: 0, max: 100, inclusive_min: false, inclusive_max: false, message: "Informe uma margem de lucro válida maior que zero." }, combined_percent_limit: { key: "combined_percent_limit", value: 100, message: "A soma de despesas e margem não pode atingir ou ultrapassar 100%." }, labels: { cost: "Custo", expenses_percent: "Despesas", margin_percent: "Margem" }, help_texts: { cost: "Custo unitário do produto ou serviço.", expenses_percent: "Percentual de despesas sobre o preço de venda.", margin_percent: "Percentual de lucro esperado." } },
  },
  tax: { simples_nacional: { max_rbt12: 4800000, monthly_revenue: { key: "monthly_revenue", min: 0, max: null, inclusive_min: false, inclusive_max: true, message: "A receita bruta do mês atual deve ser maior que zero." }, rbt12: { key: "rbt12", min: 0, max: 4800000, inclusive_min: false, inclusive_max: true, message: "O faturamento acumulado dos últimos 12 meses deve estar dentro do limite do Simples Nacional." }, annex_descriptions: { I: "Comércio", II: "Indústria", III: "Serviços", IV: "Serviços com incidência específica", V: "Serviços sujeitos ao Fator R" }, states: estados, legal_texts: { formula: "Alíquota Efetiva = ((RBT12 × Alíquota Nominal) − Parcela a Deduzir) ÷ RBT12.", das: "DAS = Receita Bruta do Mês × Alíquota Efetiva." }, validation_messages: { limit_exceeded: "O RBT12 ultrapassa o limite máximo do Simples Nacional.", invalid_annex: "Informe um anexo válido." }, brackets: rawBrackets.map(([annex, bracket, min_revenue, max_revenue, nominal_rate, deduction_amount]) => ({ regime: "simples_nacional", annex, bracket, min_revenue, max_revenue, nominal_rate, deduction_amount })) } },
  hr: { payroll: { enabled: false, validation_messages: {}, future_integrations: {} } },
  import: { allowed_extensions: ["csv", "xlsx", "xls"], max_file_size_mb: 20, validation_messages: { invalid_extension: "Formato de arquivo não permitido.", max_size: "Arquivo acima do tamanho máximo permitido." }, future_integrations: {} },
  export: { allowed_formats: ["csv", "xlsx", "pdf"], default_format: "xlsx", validation_messages: {}, future_integrations: {} },
  seo: [],
};
