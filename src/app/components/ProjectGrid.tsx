import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ExternalLink, User, Calendar, Layers } from "lucide-react";
import { ProjectModal } from "./ProjectModal";
import type { ProjectDetail } from "./ProjectModal";

type ProjectType = "Webapp" | "RPA" | "Agent";

const TYPE_COLORS: Record<ProjectType, { bg: string; text: string; border: string; shadow: string }> = {
  Webapp: { bg: "#e8f1fd", text: "#0070e0", border: "rgba(0,112,224,0.25)", shadow: "rgba(0,112,224,0.12)" },
  RPA:    { bg: "#e6f7f2", text: "#059669", border: "rgba(5,150,105,0.25)", shadow: "rgba(5,150,105,0.12)" },
  Agent:  { bg: "#f2eeff", text: "#7c3aed", border: "rgba(124,58,237,0.25)", shadow: "rgba(124,58,237,0.12)" },
};

const PROJECTS: ProjectDetail[] = [
  {
    id: "p1",
    name: "智能合同审查助手",
    description: "基于LLM的合同风险识别与合规检测平台",
    type: "Agent",
    author: "LuPan",
    date: "2026-05-20",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=300&fit=crop&auto=format",
    tags: ["NLP", "LLM", "Legal"],
    detail: {
      overview: "智能合同审查助手通过大语言模型对上传的合同文本进行自动解析，识别合同中的风险条款、合规问题和关键义务节点。系统支持中英双语合同，可对接企业现有法务系统，将人工审查周期从平均 3 天压缩至 15 分钟以内。",
      highlights: [
        "支持 PDF / Word / 图片扫描件多种格式自动 OCR 提取",
        "内置 200+ 条风险规则库，覆盖劳动合同、采购合同、服务协议三大类",
        "风险条款高亮标注，提供修改建议与合规替代表述",
        "审查结果一键导出为 Word 格式批注报告",
      ],
      keyPoints: [
        "使用 Claude Sonnet 作为审查推理引擎，System Prompt 中内嵌企业合规知识库",
        "合同分段拆解后并发调用 API，单份合同平均响应时间 < 20s",
        "风险等级分为高 / 中 / 低三档，通过 Few-shot 示例校准输出格式",
        "前端使用 React + PDF.js 实现内嵌阅读器与高亮标注同步",
      ],
      notes: [
        "模型输出不构成正式法律意见，最终决策须经法务人员确认",
        "涉及高度保密合同建议启用私有化部署模式，避免数据外传",
        "OCR 精度对扫描件质量敏感，建议使用 300dpi 以上图片",
      ],
      techStack: ["Claude API", "Python", "FastAPI", "React", "PDF.js", "PostgreSQL", "Docker"],
    },
    attachments: [
      { name: "skill.md", type: "skill", size: "12 KB" },
      { name: "PRD 文档", type: "prd", size: "1.2 MB" },
      { name: "工作文件夹打包", type: "folder", size: "34 MB" },
      { name: "测试用例集", type: "test", size: "220 KB" },
    ],
  },
  {
    id: "p2",
    name: "供应链数据看板",
    description: "实时供应链KPI监控与异常预警可视化平台",
    type: "Webapp",
    author: "asofa",
    date: "2026-05-18",
    thumbnail: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=480&h=300&fit=crop&auto=format",
    tags: ["React", "ECharts", "MySQL"],
    detail: {
      overview: "供应链数据看板整合来自 ERP、WMS 及第三方物流平台的数据，提供库存水位、订单履行率、供应商交货及时率等核心 KPI 的实时可视化监控，并内置异常预警规则引擎，支持钉钉 / 企业微信消息推送。",
      highlights: [
        "零代码配置告警阈值，业务人员可自助维护规则",
        "支持 T+0 实时数据与 T+1 历史数据双模式切换",
        "大屏模式适配会议室投屏，自动轮播关键指标",
        "移动端自适应，支持手机端随时查看核心数据",
      ],
      keyPoints: [
        "前端使用 React 18 + ECharts 5，折线图、热力图、桑基图覆盖主要分析场景",
        "后端 Node.js + MySQL，定时任务每 5 分钟全量刷新，WebSocket 推送增量变更",
        "异常检测采用 3-Sigma 统计规则 + 人工规则双引擎",
        "数据权限按仓库 / 品类维度隔离，RBAC 角色控制",
      ],
      notes: [
        "ERP 接口存在 5-10 分钟数据延迟，看板显示时间戳以实际刷新时间为准",
        "历史数据超过 18 个月需归档到冷存储，查询性能会下降",
      ],
      techStack: ["React", "ECharts", "Node.js", "MySQL", "WebSocket", "钉钉 SDK"],
    },
    attachments: [
      { name: "PRD 文档", type: "prd", size: "2.1 MB" },
      { name: "工作文件夹打包", type: "folder", size: "58 MB" },
      { name: "接口文档", type: "doc", size: "380 KB" },
      { name: "测试报告", type: "test", size: "140 KB" },
    ],
  },
  {
    id: "p3",
    name: "HR入职自动化流程",
    description: "新员工入职材料收集、审批、系统创建全流程RPA",
    type: "RPA",
    author: "LuPan",
    date: "2026-05-15",
    thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=480&h=300&fit=crop&auto=format",
    tags: ["UiPath", "SAP", "Email"],
    detail: {
      overview: "HR 入职自动化流程通过 RPA 机器人串联 HR 系统、SAP、邮件和钉钉审批，实现从 offer 签收到员工账号开通的全流程无人值守自动化，将平均入职处理时长从 2 天缩短至 2 小时。",
      highlights: [
        "全程零人工干预，异常情况自动发邮件告知 HR 专员",
        "兼容集团旗下 5 家子公司的不同 HR 系统界面",
        "每月节省 HR 团队约 120 人时的重复操作",
        "支持批量入职场景，单次可处理 50 人并发",
      ],
      keyPoints: [
        "使用 UiPath Studio 编排流程，通过 REFramework 模板保证稳定性与可重试性",
        "SAP GUI 自动化采用 UiPath SAP Connector，稳定性优于纯界面抓取",
        "入职材料 OCR 识别（身份证、学历证）集成阿里云 OCR API",
        "异常处理分为业务异常和系统异常两类，分别走不同的告警通道",
      ],
      notes: [
        "SAP 系统升级后界面元素 ID 可能变化，需回归测试选择器",
        "身份证 OCR 识别率约 96%，剩余 4% 需 HR 人工复核",
        "流程运行依赖 RPA 服务器在线，请勿在运行期间重启服务器",
      ],
      techStack: ["UiPath", "SAP GUI", "阿里云 OCR", "SMTP", "钉钉 Open API", "SQL Server"],
    },
    attachments: [
      { name: "skill.md", type: "skill", size: "8 KB" },
      { name: "流程设计文档", type: "prd", size: "900 KB" },
      { name: "UiPath 项目打包", type: "folder", size: "22 MB" },
      { name: "UAT 测试用例", type: "test", size: "180 KB" },
    ],
  },
  {
    id: "p4",
    name: "客户服务智能路由",
    description: "多渠道客诉自动分类、优先级排序与智能派单系统",
    type: "Agent",
    author: "aejha",
    date: "2026-05-12",
    thumbnail: "https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0?w=480&h=300&fit=crop&auto=format",
    tags: ["Claude", "NLP", "CRM"],
    detail: {
      overview: "客户服务智能路由系统接入微信、APP、400 热线三个渠道的工单，通过 LLM 自动完成问题分类、紧急度判断和技能组匹配，将正确派单率从 72% 提升至 94%，平均首响应时间缩短 40%。",
      highlights: [
        "支持微信公众号 / App 内反馈 / 400 热线转文字三路接入",
        "情绪识别模块自动标记高激动客户，优先人工介入",
        "派单逻辑可视化配置，业务组长可自助调整分类规则",
        "实时座席负载感知，避免单座席工单积压",
      ],
      keyPoints: [
        "分类模型基于 Claude API，Few-shot prompt 内嵌 50 个标注示例",
        "工单优先级综合考量：客户等级 × 问题严重度 × 等待时长三维评分",
        "与 Salesforce CRM 双向同步，派单结果实时回写工单状态",
        "历史派单数据每周自动更新 Few-shot 示例库，持续优化准确率",
      ],
      notes: [
        "热线语音转文字使用讯飞 API，方言识别准确率相对偏低",
        "CRM 字段映射依赖 Salesforce Sandbox 测试，正式环境需重新验证",
      ],
      techStack: ["Claude API", "Python", "Salesforce API", "讯飞语音", "Redis", "PostgreSQL"],
    },
    attachments: [
      { name: "skill.md", type: "skill", size: "15 KB" },
      { name: "PRD 文档", type: "prd", size: "1.8 MB" },
      { name: "工作文件夹打包", type: "folder", size: "41 MB" },
      { name: "分类准确率测试报告", type: "test", size: "310 KB" },
    ],
  },
  {
    id: "p5",
    name: "财务报表生成器",
    description: "从ERP自动提取数据并生成标准化月度财务报告",
    type: "RPA",
    author: "akljlkd",
    date: "2026-05-10",
    thumbnail: "https://images.unsplash.com/photo-1686061593213-98dad7c599b9?w=480&h=300&fit=crop&auto=format",
    tags: ["Python", "Excel", "SAP"],
    detail: {
      overview: "财务报表生成器每月末自动从 SAP FI 模块提取科目余额、利润中心数据，按集团统一模板生成 Excel 报告并发送给各事业部财务负责人，取代原有约 16 小时的人工汇总工作。",
      highlights: [
        "全程自动运行，每月 1 日凌晨 2 点定时触发",
        "输出格式与集团财务部要求的标准模板 100% 一致",
        "内置数据勾稽校验，发现异常自动中断并告警",
        "历史报告自动归档至 SharePoint，支持按年月检索",
      ],
      keyPoints: [
        "使用 Python + SAP RFC（pyrfc 库）直连 SAP，无需经过 GUI 界面",
        "openpyxl 负责模板填充，保留原有公式和格式，仅替换数据区域",
        "校验规则：资产负债表左右平衡、利润表与利润中心汇总一致",
        "SMTP 发送报告，收件人列表从 AD 目录动态拉取",
      ],
      notes: [
        "SAP 月结关账后数据才稳定，流程需在关账操作完成后触发",
        "pyrfc 依赖 SAP NetWeaver RFC SDK，部署时需单独安装",
      ],
      techStack: ["Python", "SAP RFC (pyrfc)", "openpyxl", "SMTP", "SharePoint API", "Windows Task Scheduler"],
    },
    attachments: [
      { name: "流程说明文档", type: "prd", size: "760 KB" },
      { name: "Python 项目打包", type: "folder", size: "18 MB" },
      { name: "测试数据集", type: "test", size: "95 KB" },
    ],
  },
  {
    id: "p6",
    name: "项目管理协作平台",
    description: "AI辅助任务分解、进度追踪与团队协作工作台",
    type: "Webapp",
    author: "LuPan",
    date: "2026-05-08",
    thumbnail: "https://images.unsplash.com/photo-1686061592689-312bbfb5c055?w=480&h=300&fit=crop&auto=format",
    tags: ["React", "Node.js", "PostgreSQL"],
    detail: {
      overview: "AI 项目管理协作平台提供需求录入 → AI 任务分解 → 甘特图排期 → 进度跟踪的完整闭环。内置 AI 助手可根据项目描述自动生成 WBS，并根据历史完成率预测交付风险。",
      highlights: [
        "一句话描述项目，AI 自动生成 WBS 任务树",
        "甘特图支持拖拽调整，依赖关系自动联动",
        "每日站会摘要由 AI 自动生成，减少会议记录负担",
        "延期风险预测提前 3 天预警，附带影响分析",
      ],
      keyPoints: [
        "任务分解使用 Claude API，Prompt 中注入项目类型和团队规模上下文",
        "甘特图基于 DHTMLX Gantt 二次开发，支持多级子任务和里程碑",
        "进度数据每日快照存入 PostgreSQL，用于趋势分析和燃尽图",
        "团队成员工作量热力图帮助识别资源瓶颈",
      ],
      notes: [
        "AI 生成的 WBS 仅供参考，项目经理需根据实际情况调整",
        "甘特图在任务数超过 500 条时渲染性能下降，建议按阶段分组查看",
      ],
      techStack: ["React", "Node.js", "PostgreSQL", "DHTMLX Gantt", "Claude API", "WebSocket"],
    },
    attachments: [
      { name: "skill.md", type: "skill", size: "11 KB" },
      { name: "PRD 文档", type: "prd", size: "2.4 MB" },
      { name: "工作文件夹打包", type: "folder", size: "67 MB" },
      { name: "E2E 测试报告", type: "test", size: "250 KB" },
    ],
  },
  {
    id: "p7",
    name: "采购询价智能助手",
    description: "自动比价、供应商评分与采购建议生成Agent",
    type: "Agent",
    author: "aerothbkdza",
    date: "2026-04-28",
    thumbnail: "https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?w=480&h=300&fit=crop&auto=format",
    tags: ["LLM", "RAG", "Procurement"],
    detail: {
      overview: "采购询价智能助手接收采购需求后，自动向供应商库发送询价邮件，汇总报价后进行多维度比价分析，结合供应商历史交货评分生成采购建议报告，将采购决策周期从 5 天压缩至 1 天。",
      highlights: [
        "支持从 ERP 直接导入 BOM 表，自动生成询价清单",
        "供应商评分综合价格、交货期、质量、账期四个维度",
        "比价报告一键生成 PPT，直接用于采购评审会议",
        "新供应商风险评估自动抓取工商信息和舆情数据",
      ],
      keyPoints: [
        "RAG 检索供应商历史数据（价格走势、交货表现），注入 LLM 上下文",
        "邮件解析使用结构化提取 Prompt，兼容多种报价格式",
        "比价逻辑支持自定义权重配置，满足不同品类采购策略差异",
        "工商信息通过天眼查 API 拉取，舆情通过百度新闻 RSS 监控",
      ],
      notes: [
        "供应商邮件回复解析依赖格式规范度，非标格式需人工辅助",
        "天眼查 API 调用有频率限制，批量查询时注意控制并发",
      ],
      techStack: ["Claude API", "Python", "LangChain", "Qdrant", "SMTP", "天眼查 API", "FastAPI"],
    },
    attachments: [
      { name: "skill.md", type: "skill", size: "14 KB" },
      { name: "PRD 文档", type: "prd", size: "1.5 MB" },
      { name: "工作文件夹打包", type: "folder", size: "29 MB" },
      { name: "比价逻辑测试用例", type: "test", size: "195 KB" },
    ],
  },
  {
    id: "p8",
    name: "ERP数据同步机器人",
    description: "跨系统主数据自动同步与差异核查RPA流程",
    type: "RPA",
    author: "asofa",
    date: "2026-04-22",
    thumbnail: "https://images.unsplash.com/photo-1757466762489-52fea38071ad?w=480&h=300&fit=crop&auto=format",
    tags: ["RPA", "ERP", "API"],
    detail: {
      overview: "ERP 数据同步机器人每日自动比对集团 SAP 与各子公司本地 ERP 的物料主数据、客商主数据，检测差异并按规则自动修复或推送人工审核队列，保障主数据一致性。",
      highlights: [
        "覆盖物料、供应商、客户三类主数据，日均处理 2 万条记录",
        "差异自动修复率达 85%，剩余推人工审核",
        "每日生成差异统计报告，邮件发送数据治理团队",
        "支持新增子公司快速接入，配置模板化",
      ],
      keyPoints: [
        "使用 UiPath 编排，核心比对逻辑用 Python Activity 实现，性能优于纯 GUI",
        "差异判断规则配置化，存储于 Excel 规则表，业务人员可维护",
        "修复操作通过 SAP BAPI 接口写入，保留操作日志用于审计",
        "异常数据推送至钉钉审核群，支持在钉钉内一键审批",
      ],
      notes: [
        "SAP BAPI 调用需确保运行账号有对应物料类型的修改权限",
        "子公司 ERP 若为非标系统，接入前需开发数据导出适配器",
      ],
      techStack: ["UiPath", "Python", "SAP BAPI", "钉钉 API", "SQL Server", "SMTP"],
    },
    attachments: [
      { name: "流程设计文档", type: "prd", size: "1.1 MB" },
      { name: "UiPath 项目打包", type: "folder", size: "25 MB" },
      { name: "差异规则配置表", type: "doc", size: "45 KB" },
      { name: "UAT 测试记录", type: "test", size: "160 KB" },
    ],
  },
  {
    id: "p9",
    name: "内部知识库问答系统",
    description: "企业文档RAG检索与多轮对话知识问答平台",
    type: "Webapp",
    author: "LuPan",
    date: "2026-04-18",
    thumbnail: "https://images.unsplash.com/photo-1771791814213-aa95b14ed9c7?w=480&h=300&fit=crop&auto=format",
    tags: ["RAG", "Vector DB", "React"],
    detail: {
      overview: "内部知识库问答系统将集团内部文档（制度手册、流程文件、产品资料）向量化入库，员工通过自然语言提问即可获取精准答案，并附带原文引用来源，减少重复性内部咨询工作量约 60%。",
      highlights: [
        "支持 Word、PDF、PPT、Excel 四种格式文档自动解析入库",
        "答案附带原文片段引用，可点击跳转原始文档",
        "多轮对话上下文记忆，支持追问和对比分析",
        "管理员后台支持文档分类、权限控制和问答质量评分",
      ],
      keyPoints: [
        "文档切片策略：按段落 + 语义边界混合切割，避免上下文断裂",
        "向量模型使用 text-embedding-3-large，召回率优于 ada-002",
        "Hybrid Search：BM25 关键词检索 + 向量检索结果 RRF 融合排序",
        "答案生成使用 Claude Sonnet，Prompt 要求引用文档段落编号",
      ],
      notes: [
        "文档更新后需重新向量化，建议设置 Webhook 触发自动同步",
        "敏感级别文档需在上传时标注权限标签，避免越权查询",
        "问答质量与文档质量强相关，建议优先清理低质量历史文档",
      ],
      techStack: ["Claude API", "React", "FastAPI", "Qdrant", "text-embedding-3-large", "PostgreSQL", "MinIO"],
    },
    attachments: [
      { name: "skill.md", type: "skill", size: "16 KB" },
      { name: "PRD 文档", type: "prd", size: "2.0 MB" },
      { name: "工作文件夹打包", type: "folder", size: "52 MB" },
      { name: "RAG 评测报告", type: "test", size: "280 KB" },
      { name: "部署文档", type: "doc", size: "190 KB" },
    ],
  },
];

const TYPE_FILTERS: (ProjectType | "All")[] = ["All", "Webapp", "RPA", "Agent"];

function TypeBadge({ type }: { type: ProjectType }) {
  const c = TYPE_COLORS[type];
  return (
    <span
      style={{
        background: c.bg, color: c.text, border: `1px solid ${c.border}`,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.63rem", letterSpacing: "0.08em",
        padding: "2px 8px", borderRadius: 4,
        textTransform: "uppercase", fontWeight: 500,
      }}
    >
      {type}
    </span>
  );
}

function ProjectCard({ project, onClick }: { project: ProjectDetail; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const c = TYPE_COLORS[project.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        background: "#ffffff",
        border: `1px solid ${hovered ? c.border : "rgba(0,80,180,0.09)"}`,
        borderRadius: 12, overflow: "hidden", cursor: "pointer",
        transition: "all 0.22s ease",
        boxShadow: hovered
          ? `0 8px 30px ${c.shadow}, 0 2px 8px rgba(0,0,0,0.06)`
          : "0 1px 6px rgba(0,40,120,0.06)",
        transform: hovered ? "translateY(-3px)" : "none",
      }}
    >
      <div className="relative" style={{ paddingBottom: "56.25%" }}>
        <img
          src={project.thumbnail}
          alt={project.name}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover",
            filter: hovered ? "brightness(1.03) saturate(1.05)" : "brightness(0.95) saturate(0.9)",
            transition: "filter 0.22s ease",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(255,255,255,0.4) 0%, transparent 50%)" }} />
        <div className="absolute top-2.5 right-2.5">
          <TypeBadge type={project.type} />
        </div>
        {hovered && (
          <div className="absolute top-2.5 left-2.5">
            <div
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(0,80,180,0.15)", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}
            >
              <ExternalLink size={11} color="#0070e0" />
            </div>
          </div>
        )}
      </div>

      <div className="px-4 pt-3 pb-3">
        <div style={{ fontFamily: "'Exo 2', sans-serif", fontSize: "0.88rem", fontWeight: 600, color: "#0f1c2e", marginBottom: 3, lineHeight: 1.35, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {project.name}
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.74rem", color: "#6b84a0", marginBottom: 10, lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {project.description}
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.map((tag) => (
            <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#6b84a0", background: "#f0f4f9", border: "1px solid rgba(0,80,180,0.09)", padding: "1px 6px", borderRadius: 3 }}>
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid rgba(0,80,180,0.07)" }}>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#e8f1fd", border: "1px solid rgba(0,112,224,0.2)" }}>
              <User size={10} color="#0070e0" />
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#0f1c2e", fontWeight: 500 }}>{project.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={10} color="#6b84a0" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.64rem", color: "#6b84a0" }}>{project.date}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectGrid() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<ProjectType | "All">("All");
  const [authorFilter, setAuthorFilter] = useState("All");
  const [selected, setSelected] = useState<ProjectDetail | null>(null);

  const authors = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.author)))];

  const filtered = PROJECTS.filter((p) => {
    const matchType = typeFilter === "All" || p.type === typeFilter;
    const matchAuthor = authorFilter === "All" || p.author === authorFilter;
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchType && matchAuthor && matchSearch;
  });

  return (
    <>
      <div style={{ background: "#f5f7fa", minHeight: "100vh", padding: "2rem 2.5rem 4rem" }}>
        {/* Filter bar */}
        <div
          className="flex flex-wrap items-center gap-3 mb-7 px-5 py-3 rounded-xl"
          style={{ background: "#ffffff", border: "1px solid rgba(0,80,180,0.09)", boxShadow: "0 1px 8px rgba(0,40,120,0.05)" }}
        >
          <div className="flex items-center gap-1.5">
            <Layers size={13} color="#6b84a0" />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#6b84a0", marginRight: 2 }}>Type</span>
            {TYPE_FILTERS.map((t) => {
              const active = typeFilter === t;
              const c = t !== "All" ? TYPE_COLORS[t as ProjectType] : null;
              return (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t as ProjectType | "All")}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem",
                    padding: "3px 10px", borderRadius: 5,
                    border: active ? `1px solid ${c ? c.border : "rgba(0,112,224,0.3)"}` : "1px solid rgba(0,80,180,0.1)",
                    background: active ? (c ? c.bg : "#e8f1fd") : "transparent",
                    color: active ? (c ? c.text : "#0070e0") : "#6b84a0",
                    cursor: "pointer", transition: "all 0.15s",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>

          <div style={{ width: 1, height: 18, background: "rgba(0,80,180,0.1)" }} className="hidden sm:block" />

          <div className="flex items-center gap-1.5">
            <User size={13} color="#6b84a0" />
            <select
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", background: "#f5f7fa", border: "1px solid rgba(0,80,180,0.12)", borderRadius: 5, color: "#0f1c2e", padding: "3px 8px", cursor: "pointer", outline: "none" }}
            >
              {authors.map((a) => (
                <option key={a} value={a}>{a === "All" ? "All Creators" : a}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 ml-auto px-3 py-1.5 rounded-lg" style={{ background: "#f5f7fa", border: "1px solid rgba(0,80,180,0.1)", minWidth: 220 }}>
            <Search size={13} color="#6b84a0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              style={{ background: "transparent", border: "none", outline: "none", fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "#0f1c2e", width: "100%" }}
            />
          </div>

          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "#6b84a0", whiteSpace: "nowrap" }}>
            {filtered.length} / {PROJECTS.length}
          </span>
        </div>

        {/* Grid */}
        <motion.div layout className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={() => setSelected(project)} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20" style={{ color: "#6b84a0", fontFamily: "'Inter', sans-serif" }}>
            <Search size={32} color="#c5d5e8" style={{ marginBottom: 12 }} />
            <p style={{ fontSize: "0.875rem" }}>No projects match the current filters</p>
          </div>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
