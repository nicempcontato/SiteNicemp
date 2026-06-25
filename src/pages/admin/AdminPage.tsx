import { BarChart3, Coins, Database, FileDown, FileUp, Gauge, LockKeyhole, ReceiptText, Search, Settings, ShieldCheck, Users } from "lucide-react";
import { AppLayout, PageContainer, PageHeader } from "@/components/ds/AppLayout";
import { MetricCard } from "@/components/ds/MetricCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const modules = [
  { key: "dashboard", title: "Dashboard", icon: Gauge, description: "Saúde da plataforma, módulos ativos e últimas versões." },
  { key: "configuration", title: "Configuration", icon: Settings, description: "Centralização de regras, textos, validações e feature flags." },
  { key: "tools", title: "Tools", icon: BarChart3, description: "Disponibilidade, campos, exemplos, FAQ e mensagens por ferramenta." },
  { key: "financial", title: "Financial", icon: Coins, description: "Percentuais, faixas, limites e regras financeiras." },
  { key: "tax", title: "Tax", icon: ReceiptText, description: "Regimes, anexos, alíquotas, deduções, limites, CNAE, estados e cidades." },
  { key: "hr", title: "HR", icon: Users, description: "Parâmetros para RH, folha, benefícios e integrações futuras." },
  { key: "import", title: "Import & Export", icon: FileUp, description: "Formatos, limites, validações e rotinas de entrada e saída." },
  { key: "seo", title: "SEO", icon: Search, description: "Title, description, canonical, OG, Twitter Card, FAQ Schema e JSON-LD." },
  { key: "system", title: "System Settings", icon: LockKeyhole, description: "Permissões, ambiente, auditoria e segurança operacional." },
];

const editableItems = ["Percentuais", "Faixas", "Alíquotas", "Limites", "Textos legais", "Descrições", "Help texts", "Exemplos", "FAQ", "SEO", "Disponibilidade", "Feature flags", "Mensagens", "Integrações"];

export function AdminPage() {
  return (
    <AppLayout>
      <PageContainer className="pb-20">
        <PageHeader eyebrow="Admin" title="Painel administrativo" description="Área protegida para gerenciar as configurações centrais que alimentam todas as ferramentas Nicemp." />

        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard label="Módulos" value="7" helper="Configuração independente" icon={Database} />
          <MetricCard label="Ferramentas" value="18" helper="Atual e futuro suportados" icon={BarChart3} />
          <MetricCard label="Acesso" value="RBAC" helper="Supabase Auth compatível" icon={ShieldCheck} />
        </div>

        <Tabs defaultValue="dashboard" className="mt-6">
          <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
            {modules.map((module) => (
              <TabsTrigger key={module.key} value={module.key} className="rounded-md border border-slate-200 bg-white data-[state=active]:border-green-700 data-[state=active]:text-green-700">
                {module.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {modules.map((module) => (
            <TabsContent key={module.key} value={module.key} className="mt-6">
              <Card className="rounded-lg border-slate-200 shadow-sm">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <module.icon className="h-6 w-6 text-green-700" />
                      <CardTitle className="mt-4">{module.title}</CardTitle>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{module.description}</p>
                    </div>
                    <Badge variant="outline">Versionado</Badge>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4 lg:grid-cols-2">
                  <Input placeholder="Chave da configuração" />
                  <Input placeholder="Data de vigência" />
                  <Textarea className="min-h-32 lg:col-span-2" placeholder="JSON de configuração validado pelo schema do módulo" />
                  <div className="flex flex-wrap gap-2 lg:col-span-2">
                    {editableItems.map((item) => <Badge key={item} variant="secondary">{item}</Badge>)}
                  </div>
                  <div className="flex flex-wrap gap-3 lg:col-span-2">
                    <Button>Salvar nova versão</Button>
                    <Button variant="outline">Validar schema</Button>
                    <Button variant="outline">Histórico</Button>
                    <Button variant="outline">Rollback</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="rounded-lg border-slate-200 shadow-sm">
            <CardHeader><CardTitle>Exportação de configuração</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-3"><Button variant="outline"><FileDown className="mr-2 h-4 w-4" />Exportar JSON</Button><Button variant="outline"><FileDown className="mr-2 h-4 w-4" />Exportar SQL</Button></CardContent>
          </Card>
          <Card className="rounded-lg border-slate-200 shadow-sm">
            <CardHeader><CardTitle>Importação de configuração</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-3"><Button variant="outline"><FileUp className="mr-2 h-4 w-4" />Importar versão</Button><Button variant="outline">Pré-validar</Button></CardContent>
          </Card>
        </div>
      </PageContainer>
    </AppLayout>
  );
}
