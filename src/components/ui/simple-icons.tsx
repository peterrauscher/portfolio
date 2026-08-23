/* eslint-disable @next/next/no-img-element */
import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
};

const createSimpleIcon = (
  slug: string,
  label: string,
): ComponentType<IconProps> => {
  const Icon = ({ className }: IconProps) => (
    <img
      src={`https://cdn.simpleicons.org/${slug}`}
      alt={`${label} logo`}
      className={cn("rounded object-contain", className)}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );

  Icon.displayName = `${label.replace(/[^A-Za-z0-9]/g, "")}SimpleIcon`;
  return Icon;
};
export const ActixSimpleIcon = createSimpleIcon("actix", "Actix Web");

export const DjangoSimpleIcon = createSimpleIcon("django", "Django");
export const FastApiSimpleIcon = createSimpleIcon("fastapi", "FastAPI");
export const ExpressSimpleIcon = createSimpleIcon("express", "Express");
export const ReduxSimpleIcon = createSimpleIcon("redux", "Redux");
export const TanStackQuerySimpleIcon = createSimpleIcon(
  "reactquery",
  "TanStack Query",
);
export const RedisSimpleIcon = createSimpleIcon("redis", "Redis");
export const MongoDbSimpleIcon = createSimpleIcon("mongodb", "MongoDB");
export const AwsSimpleIcon = ({ className }: IconProps) => (
  <img
    src="/aws.svg"
    alt="AWS logo"
    className={cn("rounded object-contain", className)}
    loading="lazy"
    decoding="async"
    draggable={false}
  />
);
export const GcpSimpleIcon = ({ className }: IconProps) => (
  <img
    src="/gcp.svg"
    alt="Google Cloud logo"
    className={cn("rounded object-contain", className)}
    loading="lazy"
    decoding="async"
    draggable={false}
  />
);
export const HonoSimpleIcon = createSimpleIcon("hono", "Hono");
export const TerraformSimpleIcon = createSimpleIcon("terraform", "Terraform");
export const PulumiSimpleIcon = createSimpleIcon("pulumi", "Pulumi");
export const KafkaSimpleIcon = createSimpleIcon("apachekafka", "Kafka");
export const RabbitMqSimpleIcon = createSimpleIcon("rabbitmq", "RabbitMQ");
export const DotNetSimpleIcon = createSimpleIcon("dotnet", ".NET");
export const RustSimpleIcon = ({ className }: IconProps) => (
  <img
    src="/rust.svg"
    alt="Rust logo"
    className={cn("rounded object-contain", className)}
    loading="lazy"
    decoding="async"
    draggable={false}
  />
);
