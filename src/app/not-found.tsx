import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ProjectMarkStack } from "@/components/ui/ProjectMark";
import { featuredProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
};

export default function NotFound() {
  return (
    <Container className="grid min-h-[80dvh] place-items-center pb-16 pt-28 sm:pt-32">
      <div className="surface-lift w-full max-w-[34rem] rounded-panel p-8 text-center sm:p-12">
        {/* Four marks and no "+N" bubble: on an error page an overflow count has nothing to refer to. */}
        <ProjectMarkStack projects={featuredProjects.slice(0, 4)} max={4} size={52} className="justify-center" />
        <p className="tnum mt-8 font-sans text-[56px] font-semibold leading-none tracking-[-0.05em] text-accent">404</p>
        <h1 className="mt-4 type-card-lg text-ink">찾는 페이지가 없습니다</h1>
        <p className="mt-3 type-body text-ink-2">주소가 바뀌었거나 잘못 입력된 것 같습니다.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          <LinkButton href="/" variant="primary">
            처음으로
          </LinkButton>
          <LinkButton href="/projects" arrow="right">
            프로젝트 보기
          </LinkButton>
        </div>
      </div>
    </Container>
  );
}
