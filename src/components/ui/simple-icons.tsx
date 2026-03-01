/* eslint-disable @next/next/no-img-element */
import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
};

const createSimpleIcon = (
  slug: string,
  label: string
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

export const DjangoSimpleIcon = createSimpleIcon("django", "Django");
export const FastApiSimpleIcon = createSimpleIcon("fastapi", "FastAPI");
export const ReduxSimpleIcon = createSimpleIcon("redux", "Redux");
export const TanStackQuerySimpleIcon = createSimpleIcon(
  "reactquery",
  "TanStack Query"
);
export const RedisSimpleIcon = createSimpleIcon("redis", "Redis");
export const MongoDbSimpleIcon = createSimpleIcon("mongodb", "MongoDB");
export const AwsSimpleIcon = createSimpleIcon("amazonaws", "AWS");
export const TerraformSimpleIcon = createSimpleIcon("terraform", "Terraform");
export const CelerySimpleIcon = createSimpleIcon("celery", "Celery");
export const KafkaSimpleIcon = createSimpleIcon("apachekafka", "Kafka");
export const RabbitMqSimpleIcon = createSimpleIcon("rabbitmq", "RabbitMQ");
export const DotNetSimpleIcon = createSimpleIcon("dotnet", ".NET");
