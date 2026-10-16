import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_projects_fields" AS ENUM('product-design', 'engineering', 'sustainability', 'research', 'brand', 'ux');
  CREATE TYPE "public"."enum_projects_blocks_image_width" AS ENUM('text', 'wide', 'full-bleed');
  CREATE TYPE "public"."enum_projects_blocks_compare_width" AS ENUM('text', 'wide', 'full-bleed');
  CREATE TYPE "public"."enum_projects_blocks_annotated_width" AS ENUM('text', 'wide', 'full-bleed');
  CREATE TYPE "public"."enum_projects_kind" AS ENUM('case-study', 'short');
  CREATE TYPE "public"."enum_projects_context" AS ENUM('company', 'academic', 'competition');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_fields" AS ENUM('product-design', 'engineering', 'sustainability', 'research', 'brand', 'ux');
  CREATE TYPE "public"."enum__projects_v_blocks_image_width" AS ENUM('text', 'wide', 'full-bleed');
  CREATE TYPE "public"."enum__projects_v_blocks_compare_width" AS ENUM('text', 'wide', 'full-bleed');
  CREATE TYPE "public"."enum__projects_v_blocks_annotated_width" AS ENUM('text', 'wide', 'full-bleed');
  CREATE TYPE "public"."enum__projects_v_version_kind" AS ENUM('case-study', 'short');
  CREATE TYPE "public"."enum__projects_v_version_context" AS ENUM('company', 'academic', 'competition');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_lab_entries_type" AS ENUM('sketch', 'render', 'experiment', 'code', 'early', 'note');
  CREATE TYPE "public"."enum_lab_entries_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__lab_entries_v_version_type" AS ENUM('sketch', 'render', 'experiment', 'code', 'early', 'note');
  CREATE TYPE "public"."enum__lab_entries_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "projects_fields" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_projects_fields",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_sections_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "projects_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"credit" varchar,
  	"width" "enum_projects_blocks_image_width" DEFAULT 'wide',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"credit" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_compare" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"before_id" integer,
  	"before_label" varchar DEFAULT 'CAD',
  	"after_id" integer,
  	"after_label" varchar DEFAULT 'Render',
  	"caption" varchar,
  	"credit" varchar,
  	"width" "enum_projects_blocks_compare_width" DEFAULT 'wide',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_annotated_annotations" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"x" numeric,
  	"y" numeric,
  	"label_x" numeric,
  	"label_y" numeric
  );
  
  CREATE TABLE "projects_blocks_annotated" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"credit" varchar,
  	"width" "enum_projects_blocks_annotated_width" DEFAULT 'wide',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_blocks_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"credit" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_chart_series" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" numeric,
  	"highlight" boolean
  );
  
  CREATE TABLE "projects_blocks_chart" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"unit" varchar,
  	"summary" varchar,
  	"caption" varchar,
  	"credit" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_sequence_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar
  );
  
  CREATE TABLE "projects_blocks_sequence" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"credit" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "projects_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum_projects_kind" DEFAULT 'short',
  	"order" numeric,
  	"title" varchar,
  	"slug" varchar,
  	"product_name" varchar,
  	"summary" varchar,
  	"year" numeric,
  	"date" varchar,
  	"course" varchar,
  	"institution" varchar DEFAULT 'Mondragon Unibertsitatea',
  	"collaboration" varchar,
  	"context" "enum_projects_context" DEFAULT 'academic',
  	"company" varchar,
  	"featured" boolean,
  	"recognition" varchar,
  	"hero_id" integer,
  	"card_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_projects_v_version_fields" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__projects_v_version_fields",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_sections_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"credit" varchar,
  	"width" "enum__projects_v_blocks_image_width" DEFAULT 'wide',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"credit" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_compare" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"before_id" integer,
  	"before_label" varchar DEFAULT 'CAD',
  	"after_id" integer,
  	"after_label" varchar DEFAULT 'Render',
  	"caption" varchar,
  	"credit" varchar,
  	"width" "enum__projects_v_blocks_compare_width" DEFAULT 'wide',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_annotated_annotations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"x" numeric,
  	"y" numeric,
  	"label_x" numeric,
  	"label_y" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_annotated" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"credit" varchar,
  	"width" "enum__projects_v_blocks_annotated_width" DEFAULT 'wide',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"credit" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_chart_series" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" numeric,
  	"highlight" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_chart" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"unit" varchar,
  	"summary" varchar,
  	"caption" varchar,
  	"credit" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_sequence_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_sequence" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"credit" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_kind" "enum__projects_v_version_kind" DEFAULT 'short',
  	"version_order" numeric,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_product_name" varchar,
  	"version_summary" varchar,
  	"version_year" numeric,
  	"version_date" varchar,
  	"version_course" varchar,
  	"version_institution" varchar DEFAULT 'Mondragon Unibertsitatea',
  	"version_collaboration" varchar,
  	"version_context" "enum__projects_v_version_context" DEFAULT 'academic',
  	"version_company" varchar,
  	"version_featured" boolean,
  	"version_recognition" varchar,
  	"version_hero_id" integer,
  	"version_card_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_projects_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "lab_entries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"entry_id" varchar,
  	"type" "enum_lab_entries_type",
  	"date" varchar,
  	"title" varchar,
  	"note" varchar,
  	"related_project_id" integer,
  	"link_label" varchar,
  	"link_href" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_lab_entries_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "lab_entries_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_lab_entries_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_entry_id" varchar,
  	"version_type" "enum__lab_entries_v_version_type",
  	"version_date" varchar,
  	"version_title" varchar,
  	"version_note" varchar,
  	"version_related_project_id" integer,
  	"version_link_label" varchar,
  	"version_link_href" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__lab_entries_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_lab_entries_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"placeholder" boolean,
  	"blur_data_u_r_l" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer,
  	"lab_entries_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_languages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"level" varchar NOT NULL
  );
  
  CREATE TABLE "site" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"headline" varchar NOT NULL,
  	"supporting" varchar NOT NULL,
  	"availability" varchar NOT NULL,
  	"sign_off" varchar,
  	"location" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"linkedin" varchar NOT NULL,
  	"education_institution" varchar NOT NULL,
  	"education_faculty" varchar,
  	"education_degree" varchar NOT NULL,
  	"education_years" varchar NOT NULL,
  	"education_current" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_hero_callouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"x" numeric NOT NULL,
  	"y" numeric NOT NULL,
  	"label_x" numeric NOT NULL,
  	"label_y" numeric NOT NULL
  );
  
  CREATE TABLE "homepage_approach" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"proof" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"process_grid_label" varchar NOT NULL,
  	"process_grid_title" varchar NOT NULL,
  	"process_grid_lead" varchar NOT NULL,
  	"process_grid_cta_label" varchar NOT NULL,
  	"approach_title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_how_i_work" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tool" varchar NOT NULL,
  	"where" varchar NOT NULL
  );
  
  CREATE TABLE "about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"intro" varchar NOT NULL,
  	"portrait_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "lab_page_interests" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"note" varchar NOT NULL
  );
  
  CREATE TABLE "lab_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "projects_fields" ADD CONSTRAINT "projects_fields_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_sections_body" ADD CONSTRAINT "projects_sections_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_image" ADD CONSTRAINT "projects_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_image" ADD CONSTRAINT "projects_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_grid" ADD CONSTRAINT "projects_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_compare" ADD CONSTRAINT "projects_blocks_compare_before_id_media_id_fk" FOREIGN KEY ("before_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_compare" ADD CONSTRAINT "projects_blocks_compare_after_id_media_id_fk" FOREIGN KEY ("after_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_compare" ADD CONSTRAINT "projects_blocks_compare_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_annotated_annotations" ADD CONSTRAINT "projects_blocks_annotated_annotations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_annotated"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_annotated" ADD CONSTRAINT "projects_blocks_annotated_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_annotated" ADD CONSTRAINT "projects_blocks_annotated_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_table_rows" ADD CONSTRAINT "projects_blocks_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_table" ADD CONSTRAINT "projects_blocks_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_chart_series" ADD CONSTRAINT "projects_blocks_chart_series_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_chart"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_chart" ADD CONSTRAINT "projects_blocks_chart_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_sequence_steps" ADD CONSTRAINT "projects_blocks_sequence_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_sequence_steps" ADD CONSTRAINT "projects_blocks_sequence_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_sequence"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_sequence" ADD CONSTRAINT "projects_blocks_sequence_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_sections" ADD CONSTRAINT "projects_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_body" ADD CONSTRAINT "projects_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_hero_id_media_id_fk" FOREIGN KEY ("hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_texts" ADD CONSTRAINT "projects_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_fields" ADD CONSTRAINT "_projects_v_version_fields_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_sections_body" ADD CONSTRAINT "_projects_v_version_sections_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_image" ADD CONSTRAINT "_projects_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_image" ADD CONSTRAINT "_projects_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_grid" ADD CONSTRAINT "_projects_v_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_compare" ADD CONSTRAINT "_projects_v_blocks_compare_before_id_media_id_fk" FOREIGN KEY ("before_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_compare" ADD CONSTRAINT "_projects_v_blocks_compare_after_id_media_id_fk" FOREIGN KEY ("after_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_compare" ADD CONSTRAINT "_projects_v_blocks_compare_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_annotated_annotations" ADD CONSTRAINT "_projects_v_blocks_annotated_annotations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_annotated"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_annotated" ADD CONSTRAINT "_projects_v_blocks_annotated_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_annotated" ADD CONSTRAINT "_projects_v_blocks_annotated_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_table_rows" ADD CONSTRAINT "_projects_v_blocks_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_table" ADD CONSTRAINT "_projects_v_blocks_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_chart_series" ADD CONSTRAINT "_projects_v_blocks_chart_series_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_chart"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_chart" ADD CONSTRAINT "_projects_v_blocks_chart_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_sequence_steps" ADD CONSTRAINT "_projects_v_blocks_sequence_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_sequence_steps" ADD CONSTRAINT "_projects_v_blocks_sequence_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_sequence"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_sequence" ADD CONSTRAINT "_projects_v_blocks_sequence_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_sections" ADD CONSTRAINT "_projects_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_body" ADD CONSTRAINT "_projects_v_version_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_hero_id_media_id_fk" FOREIGN KEY ("version_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_card_image_id_media_id_fk" FOREIGN KEY ("version_card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_texts" ADD CONSTRAINT "_projects_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lab_entries" ADD CONSTRAINT "lab_entries_related_project_id_projects_id_fk" FOREIGN KEY ("related_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lab_entries_rels" ADD CONSTRAINT "lab_entries_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."lab_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lab_entries_rels" ADD CONSTRAINT "lab_entries_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lab_entries_v" ADD CONSTRAINT "_lab_entries_v_parent_id_lab_entries_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."lab_entries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lab_entries_v" ADD CONSTRAINT "_lab_entries_v_version_related_project_id_projects_id_fk" FOREIGN KEY ("version_related_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lab_entries_v_rels" ADD CONSTRAINT "_lab_entries_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_lab_entries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lab_entries_v_rels" ADD CONSTRAINT "_lab_entries_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lab_entries_fk" FOREIGN KEY ("lab_entries_id") REFERENCES "public"."lab_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_languages" ADD CONSTRAINT "site_languages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_hero_callouts" ADD CONSTRAINT "homepage_hero_callouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_approach" ADD CONSTRAINT "homepage_approach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_how_i_work" ADD CONSTRAINT "about_how_i_work_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_tools" ADD CONSTRAINT "about_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lab_page_interests" ADD CONSTRAINT "lab_page_interests_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lab_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_fields_order_idx" ON "projects_fields" USING btree ("order");
  CREATE INDEX "projects_fields_parent_idx" ON "projects_fields" USING btree ("parent_id");
  CREATE INDEX "projects_sections_body_order_idx" ON "projects_sections_body" USING btree ("_order");
  CREATE INDEX "projects_sections_body_parent_id_idx" ON "projects_sections_body" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_image_order_idx" ON "projects_blocks_image" USING btree ("_order");
  CREATE INDEX "projects_blocks_image_parent_id_idx" ON "projects_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_image_path_idx" ON "projects_blocks_image" USING btree ("_path");
  CREATE INDEX "projects_blocks_image_image_idx" ON "projects_blocks_image" USING btree ("image_id");
  CREATE INDEX "projects_blocks_grid_order_idx" ON "projects_blocks_grid" USING btree ("_order");
  CREATE INDEX "projects_blocks_grid_parent_id_idx" ON "projects_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_grid_path_idx" ON "projects_blocks_grid" USING btree ("_path");
  CREATE INDEX "projects_blocks_compare_order_idx" ON "projects_blocks_compare" USING btree ("_order");
  CREATE INDEX "projects_blocks_compare_parent_id_idx" ON "projects_blocks_compare" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_compare_path_idx" ON "projects_blocks_compare" USING btree ("_path");
  CREATE INDEX "projects_blocks_compare_before_idx" ON "projects_blocks_compare" USING btree ("before_id");
  CREATE INDEX "projects_blocks_compare_after_idx" ON "projects_blocks_compare" USING btree ("after_id");
  CREATE INDEX "projects_blocks_annotated_annotations_order_idx" ON "projects_blocks_annotated_annotations" USING btree ("_order");
  CREATE INDEX "projects_blocks_annotated_annotations_parent_id_idx" ON "projects_blocks_annotated_annotations" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_annotated_order_idx" ON "projects_blocks_annotated" USING btree ("_order");
  CREATE INDEX "projects_blocks_annotated_parent_id_idx" ON "projects_blocks_annotated" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_annotated_path_idx" ON "projects_blocks_annotated" USING btree ("_path");
  CREATE INDEX "projects_blocks_annotated_image_idx" ON "projects_blocks_annotated" USING btree ("image_id");
  CREATE INDEX "projects_blocks_table_rows_order_idx" ON "projects_blocks_table_rows" USING btree ("_order");
  CREATE INDEX "projects_blocks_table_rows_parent_id_idx" ON "projects_blocks_table_rows" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_table_order_idx" ON "projects_blocks_table" USING btree ("_order");
  CREATE INDEX "projects_blocks_table_parent_id_idx" ON "projects_blocks_table" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_table_path_idx" ON "projects_blocks_table" USING btree ("_path");
  CREATE INDEX "projects_blocks_chart_series_order_idx" ON "projects_blocks_chart_series" USING btree ("_order");
  CREATE INDEX "projects_blocks_chart_series_parent_id_idx" ON "projects_blocks_chart_series" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_chart_order_idx" ON "projects_blocks_chart" USING btree ("_order");
  CREATE INDEX "projects_blocks_chart_parent_id_idx" ON "projects_blocks_chart" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_chart_path_idx" ON "projects_blocks_chart" USING btree ("_path");
  CREATE INDEX "projects_blocks_sequence_steps_order_idx" ON "projects_blocks_sequence_steps" USING btree ("_order");
  CREATE INDEX "projects_blocks_sequence_steps_parent_id_idx" ON "projects_blocks_sequence_steps" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_sequence_steps_image_idx" ON "projects_blocks_sequence_steps" USING btree ("image_id");
  CREATE INDEX "projects_blocks_sequence_order_idx" ON "projects_blocks_sequence" USING btree ("_order");
  CREATE INDEX "projects_blocks_sequence_parent_id_idx" ON "projects_blocks_sequence" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_sequence_path_idx" ON "projects_blocks_sequence" USING btree ("_path");
  CREATE INDEX "projects_sections_order_idx" ON "projects_sections" USING btree ("_order");
  CREATE INDEX "projects_sections_parent_id_idx" ON "projects_sections" USING btree ("_parent_id");
  CREATE INDEX "projects_body_order_idx" ON "projects_body" USING btree ("_order");
  CREATE INDEX "projects_body_parent_id_idx" ON "projects_body" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_hero_idx" ON "projects" USING btree ("hero_id");
  CREATE INDEX "projects_card_image_idx" ON "projects" USING btree ("card_image_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "projects_texts_order_parent" ON "projects_texts" USING btree ("order","parent_id");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_media_id_idx" ON "projects_rels" USING btree ("media_id");
  CREATE INDEX "_projects_v_version_fields_order_idx" ON "_projects_v_version_fields" USING btree ("order");
  CREATE INDEX "_projects_v_version_fields_parent_idx" ON "_projects_v_version_fields" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_sections_body_order_idx" ON "_projects_v_version_sections_body" USING btree ("_order");
  CREATE INDEX "_projects_v_version_sections_body_parent_id_idx" ON "_projects_v_version_sections_body" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_image_order_idx" ON "_projects_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_image_parent_id_idx" ON "_projects_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_image_path_idx" ON "_projects_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_image_image_idx" ON "_projects_v_blocks_image" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_grid_order_idx" ON "_projects_v_blocks_grid" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_grid_parent_id_idx" ON "_projects_v_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_grid_path_idx" ON "_projects_v_blocks_grid" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_compare_order_idx" ON "_projects_v_blocks_compare" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_compare_parent_id_idx" ON "_projects_v_blocks_compare" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_compare_path_idx" ON "_projects_v_blocks_compare" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_compare_before_idx" ON "_projects_v_blocks_compare" USING btree ("before_id");
  CREATE INDEX "_projects_v_blocks_compare_after_idx" ON "_projects_v_blocks_compare" USING btree ("after_id");
  CREATE INDEX "_projects_v_blocks_annotated_annotations_order_idx" ON "_projects_v_blocks_annotated_annotations" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_annotated_annotations_parent_id_idx" ON "_projects_v_blocks_annotated_annotations" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_annotated_order_idx" ON "_projects_v_blocks_annotated" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_annotated_parent_id_idx" ON "_projects_v_blocks_annotated" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_annotated_path_idx" ON "_projects_v_blocks_annotated" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_annotated_image_idx" ON "_projects_v_blocks_annotated" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_table_rows_order_idx" ON "_projects_v_blocks_table_rows" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_table_rows_parent_id_idx" ON "_projects_v_blocks_table_rows" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_table_order_idx" ON "_projects_v_blocks_table" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_table_parent_id_idx" ON "_projects_v_blocks_table" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_table_path_idx" ON "_projects_v_blocks_table" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_chart_series_order_idx" ON "_projects_v_blocks_chart_series" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_chart_series_parent_id_idx" ON "_projects_v_blocks_chart_series" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_chart_order_idx" ON "_projects_v_blocks_chart" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_chart_parent_id_idx" ON "_projects_v_blocks_chart" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_chart_path_idx" ON "_projects_v_blocks_chart" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_sequence_steps_order_idx" ON "_projects_v_blocks_sequence_steps" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_sequence_steps_parent_id_idx" ON "_projects_v_blocks_sequence_steps" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_sequence_steps_image_idx" ON "_projects_v_blocks_sequence_steps" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_sequence_order_idx" ON "_projects_v_blocks_sequence" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_sequence_parent_id_idx" ON "_projects_v_blocks_sequence" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_sequence_path_idx" ON "_projects_v_blocks_sequence" USING btree ("_path");
  CREATE INDEX "_projects_v_version_sections_order_idx" ON "_projects_v_version_sections" USING btree ("_order");
  CREATE INDEX "_projects_v_version_sections_parent_id_idx" ON "_projects_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_body_order_idx" ON "_projects_v_version_body" USING btree ("_order");
  CREATE INDEX "_projects_v_version_body_parent_id_idx" ON "_projects_v_version_body" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_hero_idx" ON "_projects_v" USING btree ("version_hero_id");
  CREATE INDEX "_projects_v_version_version_card_image_idx" ON "_projects_v" USING btree ("version_card_image_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_texts_order_parent" ON "_projects_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_media_id_idx" ON "_projects_v_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "lab_entries_entry_id_idx" ON "lab_entries" USING btree ("entry_id");
  CREATE INDEX "lab_entries_related_project_idx" ON "lab_entries" USING btree ("related_project_id");
  CREATE INDEX "lab_entries_updated_at_idx" ON "lab_entries" USING btree ("updated_at");
  CREATE INDEX "lab_entries_created_at_idx" ON "lab_entries" USING btree ("created_at");
  CREATE INDEX "lab_entries__status_idx" ON "lab_entries" USING btree ("_status");
  CREATE INDEX "lab_entries_rels_order_idx" ON "lab_entries_rels" USING btree ("order");
  CREATE INDEX "lab_entries_rels_parent_idx" ON "lab_entries_rels" USING btree ("parent_id");
  CREATE INDEX "lab_entries_rels_path_idx" ON "lab_entries_rels" USING btree ("path");
  CREATE INDEX "lab_entries_rels_media_id_idx" ON "lab_entries_rels" USING btree ("media_id");
  CREATE INDEX "_lab_entries_v_parent_idx" ON "_lab_entries_v" USING btree ("parent_id");
  CREATE INDEX "_lab_entries_v_version_version_entry_id_idx" ON "_lab_entries_v" USING btree ("version_entry_id");
  CREATE INDEX "_lab_entries_v_version_version_related_project_idx" ON "_lab_entries_v" USING btree ("version_related_project_id");
  CREATE INDEX "_lab_entries_v_version_version_updated_at_idx" ON "_lab_entries_v" USING btree ("version_updated_at");
  CREATE INDEX "_lab_entries_v_version_version_created_at_idx" ON "_lab_entries_v" USING btree ("version_created_at");
  CREATE INDEX "_lab_entries_v_version_version__status_idx" ON "_lab_entries_v" USING btree ("version__status");
  CREATE INDEX "_lab_entries_v_created_at_idx" ON "_lab_entries_v" USING btree ("created_at");
  CREATE INDEX "_lab_entries_v_updated_at_idx" ON "_lab_entries_v" USING btree ("updated_at");
  CREATE INDEX "_lab_entries_v_latest_idx" ON "_lab_entries_v" USING btree ("latest");
  CREATE INDEX "_lab_entries_v_rels_order_idx" ON "_lab_entries_v_rels" USING btree ("order");
  CREATE INDEX "_lab_entries_v_rels_parent_idx" ON "_lab_entries_v_rels" USING btree ("parent_id");
  CREATE INDEX "_lab_entries_v_rels_path_idx" ON "_lab_entries_v_rels" USING btree ("path");
  CREATE INDEX "_lab_entries_v_rels_media_id_idx" ON "_lab_entries_v_rels" USING btree ("media_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_lab_entries_id_idx" ON "payload_locked_documents_rels" USING btree ("lab_entries_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_languages_order_idx" ON "site_languages" USING btree ("_order");
  CREATE INDEX "site_languages_parent_id_idx" ON "site_languages" USING btree ("_parent_id");
  CREATE INDEX "homepage_hero_callouts_order_idx" ON "homepage_hero_callouts" USING btree ("_order");
  CREATE INDEX "homepage_hero_callouts_parent_id_idx" ON "homepage_hero_callouts" USING btree ("_parent_id");
  CREATE INDEX "homepage_approach_order_idx" ON "homepage_approach" USING btree ("_order");
  CREATE INDEX "homepage_approach_parent_id_idx" ON "homepage_approach" USING btree ("_parent_id");
  CREATE INDEX "homepage_hero_hero_image_idx" ON "homepage" USING btree ("hero_image_id");
  CREATE INDEX "about_how_i_work_order_idx" ON "about_how_i_work" USING btree ("_order");
  CREATE INDEX "about_how_i_work_parent_id_idx" ON "about_how_i_work" USING btree ("_parent_id");
  CREATE INDEX "about_tools_order_idx" ON "about_tools" USING btree ("_order");
  CREATE INDEX "about_tools_parent_id_idx" ON "about_tools" USING btree ("_parent_id");
  CREATE INDEX "about_portrait_idx" ON "about" USING btree ("portrait_id");
  CREATE INDEX "lab_page_interests_order_idx" ON "lab_page_interests" USING btree ("_order");
  CREATE INDEX "lab_page_interests_parent_id_idx" ON "lab_page_interests" USING btree ("_parent_id");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "projects_fields" CASCADE;
  DROP TABLE "projects_sections_body" CASCADE;
  DROP TABLE "projects_blocks_image" CASCADE;
  DROP TABLE "projects_blocks_grid" CASCADE;
  DROP TABLE "projects_blocks_compare" CASCADE;
  DROP TABLE "projects_blocks_annotated_annotations" CASCADE;
  DROP TABLE "projects_blocks_annotated" CASCADE;
  DROP TABLE "projects_blocks_table_rows" CASCADE;
  DROP TABLE "projects_blocks_table" CASCADE;
  DROP TABLE "projects_blocks_chart_series" CASCADE;
  DROP TABLE "projects_blocks_chart" CASCADE;
  DROP TABLE "projects_blocks_sequence_steps" CASCADE;
  DROP TABLE "projects_blocks_sequence" CASCADE;
  DROP TABLE "projects_sections" CASCADE;
  DROP TABLE "projects_body" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_texts" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_fields" CASCADE;
  DROP TABLE "_projects_v_version_sections_body" CASCADE;
  DROP TABLE "_projects_v_blocks_image" CASCADE;
  DROP TABLE "_projects_v_blocks_grid" CASCADE;
  DROP TABLE "_projects_v_blocks_compare" CASCADE;
  DROP TABLE "_projects_v_blocks_annotated_annotations" CASCADE;
  DROP TABLE "_projects_v_blocks_annotated" CASCADE;
  DROP TABLE "_projects_v_blocks_table_rows" CASCADE;
  DROP TABLE "_projects_v_blocks_table" CASCADE;
  DROP TABLE "_projects_v_blocks_chart_series" CASCADE;
  DROP TABLE "_projects_v_blocks_chart" CASCADE;
  DROP TABLE "_projects_v_blocks_sequence_steps" CASCADE;
  DROP TABLE "_projects_v_blocks_sequence" CASCADE;
  DROP TABLE "_projects_v_version_sections" CASCADE;
  DROP TABLE "_projects_v_version_body" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_texts" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "lab_entries" CASCADE;
  DROP TABLE "lab_entries_rels" CASCADE;
  DROP TABLE "_lab_entries_v" CASCADE;
  DROP TABLE "_lab_entries_v_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_languages" CASCADE;
  DROP TABLE "site" CASCADE;
  DROP TABLE "homepage_hero_callouts" CASCADE;
  DROP TABLE "homepage_approach" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "about_how_i_work" CASCADE;
  DROP TABLE "about_tools" CASCADE;
  DROP TABLE "about" CASCADE;
  DROP TABLE "lab_page_interests" CASCADE;
  DROP TABLE "lab_page" CASCADE;
  DROP TYPE "public"."enum_projects_fields";
  DROP TYPE "public"."enum_projects_blocks_image_width";
  DROP TYPE "public"."enum_projects_blocks_compare_width";
  DROP TYPE "public"."enum_projects_blocks_annotated_width";
  DROP TYPE "public"."enum_projects_kind";
  DROP TYPE "public"."enum_projects_context";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_fields";
  DROP TYPE "public"."enum__projects_v_blocks_image_width";
  DROP TYPE "public"."enum__projects_v_blocks_compare_width";
  DROP TYPE "public"."enum__projects_v_blocks_annotated_width";
  DROP TYPE "public"."enum__projects_v_version_kind";
  DROP TYPE "public"."enum__projects_v_version_context";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum_lab_entries_type";
  DROP TYPE "public"."enum_lab_entries_status";
  DROP TYPE "public"."enum__lab_entries_v_version_type";
  DROP TYPE "public"."enum__lab_entries_v_version_status";`);
}
