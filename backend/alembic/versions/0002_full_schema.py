"""expand schema"""
from alembic import op
import sqlalchemy as sa

revision = '0002_full_schema'
down_revision = '0001_init'
branch_labels = None
depends_on = None


def _ts_cols():
    return [
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('deleted_at', sa.DateTime(timezone=True)),
    ]


def upgrade() -> None:
    op.create_table('user_profiles', sa.Column('id', sa.Integer, primary_key=True), sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id'), nullable=False), sa.Column('full_name', sa.String(120)), *_ts_cols())
    op.create_index('ix_user_profiles_user_id', 'user_profiles', ['user_id'], unique=True)

    op.create_table('measurements', sa.Column('id', sa.Integer, primary_key=True), sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id'), nullable=False), sa.Column('height_cm', sa.Float), sa.Column('shoulder_cm', sa.Float), sa.Column('chest_cm', sa.Float), sa.Column('waist_cm', sa.Float), sa.Column('hips_cm', sa.Float), sa.Column('inseam_cm', sa.Float), *_ts_cols())
    op.create_index('ix_measurements_user_id', 'measurements', ['user_id'])

    op.create_table('avatars', sa.Column('id', sa.Integer, primary_key=True), sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id'), nullable=False), sa.Column('measurement_id', sa.Integer, sa.ForeignKey('measurements.id')), sa.Column('model_url', sa.Text), *_ts_cols())
    op.create_table('tryon_sessions', sa.Column('id', sa.Integer, primary_key=True), sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id'), nullable=False), sa.Column('avatar_id', sa.Integer, sa.ForeignKey('avatars.id'), nullable=False), sa.Column('status', sa.String(32), nullable=False), sa.Column('render_url', sa.Text), *_ts_cols())
    op.create_table('saved_outfits', sa.Column('id', sa.Integer, primary_key=True), sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id'), nullable=False), sa.Column('tryon_session_id', sa.Integer, sa.ForeignKey('tryon_sessions.id')), sa.Column('preview_url', sa.Text), *_ts_cols())
    op.create_table('wardrobe_items', sa.Column('id', sa.Integer, primary_key=True), sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id'), nullable=False), sa.Column('saved_outfit_id', sa.Integer, sa.ForeignKey('saved_outfits.id'), nullable=False), *_ts_cols())
    op.create_table('orders', sa.Column('id', sa.Integer, primary_key=True), sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id'), nullable=False), sa.Column('status', sa.String(32), nullable=False), *_ts_cols())
    op.create_table('order_items', sa.Column('id', sa.Integer, primary_key=True), sa.Column('order_id', sa.Integer, sa.ForeignKey('orders.id'), nullable=False), sa.Column('product_id', sa.Integer), sa.Column('quantity', sa.Integer, nullable=False), *_ts_cols())
    op.create_table('refresh_tokens', sa.Column('id', sa.Integer, primary_key=True), sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id'), nullable=False), sa.Column('token_hash', sa.String(255), nullable=False), sa.Column('revoked', sa.Boolean, nullable=False), *_ts_cols())
    op.create_index('ix_refresh_tokens_token_hash', 'refresh_tokens', ['token_hash'], unique=True)
    op.create_table('audit_logs', sa.Column('id', sa.Integer, primary_key=True), sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id')), sa.Column('action', sa.String(255), nullable=False), sa.Column('metadata_json', sa.Text), *_ts_cols())
    op.create_table('payment_events', sa.Column('id', sa.Integer, primary_key=True), sa.Column('provider', sa.String(32), nullable=False), sa.Column('external_event_id', sa.String(128), nullable=False), sa.Column('event_type', sa.String(128), nullable=False), sa.Column('payload_json', sa.Text, nullable=False), *_ts_cols())
    op.create_index('ix_payment_events_external_event_id', 'payment_events', ['external_event_id'], unique=True)


def downgrade() -> None:
    for table in ['payment_events','audit_logs','refresh_tokens','order_items','orders','wardrobe_items','saved_outfits','tryon_sessions','avatars','measurements','user_profiles']:
        op.drop_table(table)
