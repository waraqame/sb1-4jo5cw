import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, blob } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  avatar: text('avatar'),
  isVerified: integer('is_verified', { mode: 'boolean' }).notNull().default(false),
  isAdmin: integer('is_admin', { mode: 'boolean' }).notNull().default(false),
  credits: integer('credits').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  language: text('language').notNull(),
  progress: integer('progress').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

export const sections = sqliteTable('sections', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  projectId: integer('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  content: text('content'),
  wordCount: integer('word_count').notNull().default(0),
  aiUsageCount: integer('ai_usage_count').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

export const creditTransactions = sqliteTable('credit_transactions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  amount: integer('amount').notNull(),
  type: text('type').notNull(), // 'purchase' | 'usage'
  description: text('description'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

export const apiKeys = sqliteTable('api_keys', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  key: text('key').notNull(),
  status: text('status').notNull(), // 'active' | 'revoked'
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  lastUsed: integer('last_used', { mode: 'timestamp' }),
  usageCount: integer('usage_count').notNull().default(0)
});

export const settings = sqliteTable('settings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  basicPackagePrice: integer('basic_package_price').notNull().default(100),
  proPackagePrice: integer('pro_package_price').notNull().default(200),
  basicPackageCredits: integer('basic_package_credits').notNull().default(13),
  proPackageCredits: integer('pro_package_credits').notNull().default(30),
  maxProjectSize: integer('max_project_size').notNull().default(50),
  allowedLanguages: text('allowed_languages').notNull().default('["ar"]'),
  aiModel: text('ai_model').notNull().default('gpt-3.5-turbo'),
  maxTokens: integer('max_tokens').notNull().default(2000),
  temperature: blob('temperature', { mode: 'buffer' }).notNull().default(sql`0.7`),
  openaiApiKey: text('openai_api_key'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});